import $ from "jquery";
import autobind from "autobind-decorator";
import React from "react";
import Draggable from "react-draggable";
import Titlebar from "components/Titlebar";
import Body from "components/Body";

@autobind
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
        icon: "default.png",
        closeButton: true,
        iconizeButton: true
    };

    constructor(props) {
        super(props);
        this.state = {
            drag: false,
            iconized: this.props.iconized,
            width: this.props.width,
            height: this.props.height,
        };
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

    startDrag() {
        this.setState({
            drag: true
        });
    }

    drag(mouse, drag) {
        if (!this.props.drag && !this.props.moving) {
            this.setState({
                moving: true
            });
        }
    }

    stopDrag() {
        this.setState({
            drag: false,
            moving: false
        });
    }

    render() {
        let titlebarHeight = 32;
        let bodyY = titlebarHeight - 8;
        let bodyHeight = this.state.height - titlebarHeight;
        let totalHeight = this.state.height + titlebarHeight;

        let outlineClass = this.state.moving ? null : "hidden";
        let windowClass = this.state.moving ? "hidden" : null;

        let that = this;
        let children = React.Children.map(this.props.children, x => typeof x.type == "function" ? React.cloneElement(x, {
            window: that,
            parent: that
        }) : x);

        return (
            <Draggable onStart={this.startDrag} onDrag={this.drag} onStop={this.stopDrag}
                       defaultPosition={{ x: this.props.x, y: this.props.y }} cancel=".body">
                { this.props.iconized ? <g></g> :
                <g>
                    <defs>
                        <clipPath id={"cpb" + this.props.id}>
                            <rect className="borderClip" x="0" y="0" width={this.state.width} height={totalHeight} />
                        </clipPath>
                    </defs>
                    
                    <g clipPath={"url(#cpb" + this.props.id + ")"}>
                        <rect fill="transparent" className={"borderClip outline " + outlineClass}
                              width={this.state.width} height={totalHeight} />
                        
                        <Titlebar title={this.props.title} id={"t" + this.props.id} className={windowClass}
                                  width={this.state.width} height={titlebarHeight}
                                  closeButton={this.props.closeButton} iconizeButton={this.props.iconizeButton}
                                  closeWindow={this.closeWindow} iconizeWindow={this.iconizeWindow} raiseWindow={this.raiseWindow}
                        />
                        
                        <Body id={"b" + this.props.id}
                              className={windowClass}
                              x={0} y={bodyY}
                              width={this.state.width} height={this.state.height}
                              raiseWindow={this.raiseWindow}>
                            {children}
                        </Body>
                    </g>
                </g> }
            </Draggable>
        );
    }
}
