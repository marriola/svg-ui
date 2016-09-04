import app from "reducers/app";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    addWindow: function (window) {
        return {
            type: app.action("addWindow"),
            window
        };
    },

    addWindows: function (windows) {
        return {
            type: app.action("addWindows"),
            windows
        };
    },

    raise: function (id) {
        return {
            type: app.action("raise"),
            id
        };
    },

    close: function (id) {
        return {
            type: app.action("close"),
            id
        };
    },

    iconize: function (id, state) {
        return {
            type: app.action("iconize"),
            state,
            id
        };
    }
});
