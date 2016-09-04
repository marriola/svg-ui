import React from "react";
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

    constructor(props) {
        super(props);
        this.state = {
            drag: false,
            x: this.props.x,
            y: this.props.y,
            width: this.props.width,
            height: this.props.height,
            dragDiffX: 0,
            dragDiffY: 0
        };

        this.closeWindow = this.closeWindow.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.touchStart = this.mouseDown;
        this.mouseUp = this.mouseUp.bind(this);
        this.touchEnd = this.mouseUp;
        this.mouseMove = this.mouseMove.bind(this);
        this.touchMove = this.mouseMove;
    }

    mouseDown(event) {
        this.props.raiseWindow(this.props.id);
        
        this.setState({
            drag: true,
            moving: false,
            dragDiffX: this.state.x - event.pageX,
            dragDiffY: this.state.y - event.pageY
        });
    }

    mouseUp(event) {
        this.setState({
            drag: false,
            moving: false
        });
    }

    mouseMove(event) {
        if (this.state.drag) {
            this.setState({
                moving: true,
                x: event.pageX + this.state.dragDiffX,
                y: event.pageY + this.state.dragDiffY
            });
        }
    }

    closeWindow() {
        this.props.closeWindow(this.props.id);
    }

    render() {
        let titlebarHeight = 32;
        let bodyY = titlebarHeight - 8;
        let bodyHeight = this.state.height - titlebarHeight;

        let outlineClass = this.state.moving ? null : "hidden";
        let windowClass = this.state.moving ? "hidden" : null;
        
        return (
            <g transform={`translate(${this.state.x}, ${this.state.y})`}>
                <rect stroke="black" fill="transparent" className={outlineClass}
                      rx="5" width={this.state.width} height={this.state.height} />
                
                <Titlebar title={this.props.title} id={"t" + this.props.id} className={windowClass}
                          width={this.state.width} height={titlebarHeight}
                          closeWindow={this.closeWindow}
                          touchStart={this.touchStart} mouseDown={this.mouseDown} touchEnd={this.touchEnd} mouseUp={this.mouseUp} touchMove={this.touchMove} mouseMove={this.mouseMove} />
                
                <Body id={"b" + this.props.id}
                      className={windowClass}
                      x={0} y={bodyY}
                      width={this.state.width} height={bodyHeight}>
                    {this.props.children}
                </Body>
            </g>
        );
    }
}
