import { uniqueIdentifier } from "utils";
import React from "react";

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.raiseWindow = this.raiseWindow.bind(this);

        this.state = {
            windows: React.Children.map(this.props.children, x => React.cloneElement(x, {
                id: uniqueIdentifier(),
                raiseWindow: this.raiseWindow
            }))
        };
    }

    raiseWindow(id) {
        let index = this.state.windows.findIndex(w => w.props.id == id);
        let topWindow = this.state.windows[index];
        
        let windows = this.state.windows.slice(0, index)
            .concat(this.state.windows.slice(index + 1))
            .concat(topWindow);

        this.setState({ windows });
    }
    
    render() {
        return (
            <g>
                {this.state.windows}
            </g>
        );
    }
}

export default Application;
