import { connect } from "decorators";
import { uniqueIdentifier } from "utils";
import React from "react";
import Actions from "action-creators";

@connect("app")
export default class Application extends React.Component {
    constructor(props) {
        super(props);

        window.openWindow = this.openWindow.bind(this);

        this.raiseWindow = this.raiseWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.openWindow = this.openWindow.bind(this);

        Actions.App.addWindows(
            React.Children.map(this.props.children, x => React.cloneElement(x, {
                id: uniqueIdentifier(),
                raiseWindow: this.raiseWindow,
                closeWindow: this.closeWindow,
                openWindow: this.openWindow
            }))
        );
    }

    openWindow(window) {
        Actions.App.addWindow(React.cloneElement(window, {
            id: uniqueIdentifier(),
            raiseWindow: this.raiseWindow,
            closeWindow: this.closeWindow,
            openWindow: this.openWindow
        }));
    }

    closeWindow(id) {
        Actions.App.close(id);
    }
    
    raiseWindow(id) {
        Actions.App.raise(id);
    }
    
    render() {
        return (
            <g>
                {this.props.app.windows}
            </g>
        );
    }
}

export default Application;
