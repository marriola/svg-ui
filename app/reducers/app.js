import createReducer from "reducers";

export default createReducer({
    name: "app",

    defaultValue: {
        windows: []
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
            let index = state.windows.findIndex(w => w.props.id == action.id);
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
            let index = state.windows.findIndex(w => w.props.id == action.id);

            let windows = state.windows.slice(0, index)
                               .concat(state.windows.slice(index + 1));

            return {
                ...state,
                windows
            };
        }
    }
});
