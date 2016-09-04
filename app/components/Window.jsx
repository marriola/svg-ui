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

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
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

    render() {
        let titlebarHeight = 32;
        let bodyY = 0 + titlebarHeight - 8;
        let bodyHeight = this.state.height - titlebarHeight;

        let outlineClass = this.state.moving ? null : "hidden";
        let windowClass = this.state.moving ? "hidden" : null;

        let children = React.Children.map(this.props.children, x => React.cloneElement(x, {
            parentX: 0,
            parentY: 32
        }));
        
        return (
            <g transform={`translate(${this.state.x}, ${this.state.y})`}>
                <rect stroke="black" fill="transparent" className={outlineClass}
                      rx="5" width={this.state.width} height={this.state.height} />
                
                <Titlebar title={this.props.title} id={"t" + this.props.id} className={windowClass}
                          width={this.state.width} height={titlebarHeight}
                          mouseDown={this.mouseDown} mouseUp={this.mouseUp} mouseMove={this.mouseMove} />
                
                <Body id={"b" + this.props.id}
                      className={windowClass}
                      x={0} y={bodyY}
                      width={this.state.width} height={bodyHeight}>
                    {children}
                </Body>
            </g>
        );
    }
}
