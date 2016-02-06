'use strict';

import shallowEqual from './shallowEqual';
import { bindActionCreators } from 'redux';
import { isPlainObject, isEqual, isArray, keys } from 'lodash';

const wrapActionCreators: Function = (actionCreators: any) => {
    return ( dispatch: Redux.Dispatch ) => bindActionCreators(actionCreators, dispatch);
}
const defaultMapState: Function = ( state: any ) => ({});
const defaultMapActions: Function = ( dispatch: Redux.Dispatch) => ({ dispatch })
// Connect(stateProps, actions, options)
export default ( stateProps: any, actions?: any ) => {
    let shouldSubscribe: Boolean = Boolean(stateProps);
    let mapState: Function = stateProps || defaultMapState;
    let mapActions: Function = isPlainObject(actions) ? wrapActionCreators(actions) : actions || defaultMapActions;
    let computeStateProps: any = ( store: Redux.MiddlewareArg, props: any ) => {
        let state: any = store.getState();
        let nextState: any = mapState.length > 1 ? mapState(state, props) : mapState(state);
        if (!isPlainObject(nextState)) {
            console.error('`stateProps` must return an object. Instead received %s.', nextState);
            return;
        }
        return nextState;
    }
    let computeActions: any = ( store: Redux.MiddlewareArg, props: any ) => {
        let { dispatch }: Redux.MiddlewareArg = store;
        let nextActions: any = mapActions.length > 1 ? mapActions(dispatch, props) : mapActions(dispatch);
        if (!isPlainObject(nextActions)) {
            console.error('`actions` must return an object. Instead received %s.', nextActions);
            return;
        }
        return nextActions;
    }
    // Function: wrapWithConnect(WrappedComponent)
    return ( wrappedComponent: any) => {
        let mixin: any = {
            created(): void {
                this.trySubscribe();
            },
            destroyed(): void {
               this.unsubscribe();
            },
            data(): any {
                return {
                    store: wrappedComponent.store
                }
            },
            methods: {
                trySubscribe(): void {
                    if ( shouldSubscribe && !this.unsubscribe ) {
                        this.unsubscribe = this.store.subscribe(this.handlerChange.bind(this));
                        this.handlerChange();
                    }
                },
                handlerChange(): void {
                    this.updateState();
                    this.updateActions();
                },
                updateState(): void {
                    let nextStateProps: any = computeStateProps(this.store, this.$data);
                    keys(nextStateProps).map((k: string) => {
                        if (!isEqual(this.$get(k), nextStateProps[k])) {
                            this.$set(k, nextStateProps[k]);
                        }
                    })
                },
                updateActions(): void {
                    let saveKeys: string = 'Actions';
                    let nextActions: any = computeActions(this.store, this.$data);
                    let dispatchActions: any = this[saveKeys];
                    if (!dispatchActions || (dispatchActions && !shallowEqual(dispatchActions, nextActions))) {
                        this[saveKeys] = nextActions;
                    }
                }
            }
        }
        if (isArray(wrappedComponent.mixin)) {
            wrappedComponent.mixins.push(mixin);
        } else {
           wrappedComponent.mixins = [mixin]
        }
        return wrappedComponent;
    }
}
