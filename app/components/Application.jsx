import { connect } from "decorators";
import { uniqueIdentifier } from "utils";
import React from "react";
import Actions from "action-creators";
import IconizedWindow from "components/IconizedWindow";

@connect("app")
export default class Application extends React.Component {
    constructor(props) {
        super(props);

        window.openWindow = this.openWindow.bind(this);

        this.raiseWindow = this.raiseWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.iconizeWindow = this.iconizeWindow.bind(this);

        Actions.App.addWindows(
            React.Children.map(this.props.children, x => React.cloneElement(x, {
                id: uniqueIdentifier(),
                iconized: false,
                raiseWindow: this.raiseWindow,
                closeWindow: this.closeWindow,
                openWindow: this.openWindow,
                iconizeWindow: this.iconizeWindow
            }))
        );
    }

    openWindow(window) {
        Actions.App.addWindow(React.cloneElement(window, {
            id: uniqueIdentifier(),
            iconized: false,
            raiseWindow: this.raiseWindow,
            closeWindow: this.closeWindow,
            openWindow: this.openWindow,
            iconizeWindow: this.iconizeWindow
        }));
    }

    closeWindow(id) {
        Actions.App.close(id);
    }

    iconizeWindow(id, state) {
        Actions.App.iconize(id, state);
    }
    
    raiseWindow(id) {
        Actions.App.raise(id);
    }
    
    render() {
        let icons = this.props.app.windows
                        .filter(w => w.props.iconized)
                        .map(w => <IconizedWindow y={0} key={"iw" + w.props.id}
                                                  windowId={w.props.id} title={w.props.title}
                                                  iconizeWindow={this.iconizeWindow}
                                                  icon={w.props.icon} />);

        for (let i in icons) {
            icons[i] = React.cloneElement(icons[i], { x: i * 66 });
        }
        
        return (
            <g>
                {icons}
                {this.props.app.windows}
            </g>
        );
    }
}

export default Application;
