import App from "action-creators/app";

import store from "initialize";

export function ActionCreator(descriptor) {
    for (let key in descriptor) {
        let action = descriptor[key]
        this[key] = function() { store.dispatch(action.apply(null, arguments)); };
    }
}

export default {
    App
};
