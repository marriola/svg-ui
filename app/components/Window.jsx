import $ from "jquery";
import React from "react";
import Draggable from "react-draggable";
import Titlebar from "components/Titlebar";
import Body from "components/Body";

export default class Window extends React.Component {
    static propTypes = {
        order: React.PropTypes.number,
        x: React.PropTypes.number,
        y: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        title: React.PropTypes.string
    };

    static defaultProps = {
        icon: "bw.png"
    };

    constructor(props) {
        super(props);
        this.state = {
            drag: false,
            iconized: this.props.iconized,
            width: this.props.width,
            height: this.props.height,
        };

        this.closeWindow = this.closeWindow.bind(this);
        this.iconizeWindow = this.iconizeWindow.bind(this);
        this.raiseWindow = this.raiseWindow.bind(this);
    }

    closeWindow() {
        this.props.closeWindow(this.props.id);
    }

    iconizeWindow() {
        this.props.iconizeWindow(this.props.id, !this.props.iconized);
    }

    raiseWindow() {
        this.props.raiseWindow(this.props.id);
    }

    render() {
        let titlebarHeight = 32;
        let bodyY = titlebarHeight - 8;
        let bodyHeight = this.state.height - titlebarHeight;

        let outlineClass = this.state.moving ? null : "hidden";
        let windowClass = this.state.moving ? "hidden" : null;

        return (
            <Draggable defaultPosition={{ x: this.props.x, y: this.props.x }}>
                <g>
                    <rect stroke="black" fill="transparent" className={outlineClass}
                          rx="5" width={this.state.width} height={this.state.height} />
                    
                    <Titlebar title={this.props.title} id={"t" + this.props.id} className={windowClass}
                              width={this.state.width} height={titlebarHeight}
                              closeButton={this.props.closeButton} iconizeButton={this.props.iconizeButton}
                              closeWindow={this.closeWindow} iconizeWindow={this.iconizeWindow} raiseWindow={this.raiseWindow}
                    />
                    
                    <Body id={"b" + this.props.id}
                          className={windowClass}
                          x={0} y={bodyY}
                          width={this.state.width} height={bodyHeight}>
                        {this.props.children}
                    </Body>
                </g>
            </Draggable>
        );
    }
}
