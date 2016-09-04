import React from "react";
import createReducer from "reducers";

export default createReducer({
    name: "app",

    defaultValue: {
        windows: []
    },

    methods: {
        findWindow: function (state, id) {
            return state.windows.findIndex(w => w.props.id == id);
        }
    },

    actions: {
        addWindows: function (state, action) {
            return {
                ...state,
                windows: [
                    ...state.windows,
                    ...action.windows
                ]
            };
        },

        addWindow: function (state, action) {
            return {
                ...state,
                windows: [
                    ...state.windows,
                    action.window
                ]
            };
        },

        raise: function (state, action) {
            let index = this.findWindow(state, action.id);
            let topWindow = state.windows[index];
            
            let windows = state.windows.slice(0, index)
                              .concat(state.windows.slice(index + 1))
                              .concat(topWindow);
            
            return {
                ...state,
                windows
            };
        },

        close: function (state, action) {
            let index = this.findWindow(state, action.id);
            let windows = state.windows.slice(0, index)
                               .concat(state.windows.slice(index + 1));

            return {
                ...state,
                windows
            };
        },

        iconize: function (state, action) {
            let index = this.findWindow(state, action.id);
            let window = state.windows[index];

            window = React.cloneElement(window, { iconized: action.state });

            let windows = state.windows.slice(0, index)
                               .concat(window)
                               .concat(state.windows.slice(index + 1));

            return {
                ...state,
                windows
            };
        }
    }
});
