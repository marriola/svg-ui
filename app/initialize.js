import React from "react";
import ReactDOM from "react-dom";
import createStore from "create-store";
import Home from "components/Home";

const store = createStore();

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener("touchmove", e => e.preventDefault());

    ReactDOM.render(<Home store={store} />, document.getElementById("main"));
});

export default store;
