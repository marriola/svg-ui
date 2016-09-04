import $ from "jquery";
import React from "react";
import Titlebar from "components/Titlebar";
import Body from "components/Body";

const Drag = (function() {
    let dragDiffX, dragDiffY;
    let top, left;
    let dragging;

    function setPosition (x, y) {
        left = x;
        top = y;
    }
    
    function start (x, y) {
        dragDiffX = left - x;
        dragDiffY = top - y;
        dragging = true;
    }
    
    function move (elt, x, y) {
        if (dragging) {
            elt.setAttribute("transform", `translate(${x + dragDiffX}, ${y + dragDiffY})`);
        }
    }

    function stop (x, y) {
        dragging = false;
        setPosition(x + dragDiffX, y + dragDiffY);
    }

    return {
        setPosition,
        start,
        move,
        stop
    };
})();

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
            iconized: this.props.iconized,
            x: this.props.x,
            y: this.props.y,
            width: this.props.width,
            height: this.props.height,
            dragDiffX: 0,
            dragDiffY: 0
        };

        this.move = this.move.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.iconizeWindow = this.iconizeWindow.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.touchMove = this.touchMove.bind(this);
    }

    startDrag(x, y) {
        this.setState({
            drag: true,
            moving: false,
            dragDiffX: this.state.x - x,
            dragDiffY: this.state.y - y
        });
    }

    setPosition(x, y) {
        document.getElementById("g-" + this.props.id).setAttribute("transform", `translate(${x}, ${y})`);
    }
    
    move(x, y) {
        this.setPosition(x + this.state.dragDiffX, y + this.state.dragDiffY);

        this.setState({
            moving: true//,
            /* x: x + this.state.dragDiffX,
             * y: y + this.state.dragDiffY*/
        });        
    }

    componentDidMount() {
        this.setPosition(this.state.x, this.state.y);
        Drag.setPosition(this.state.x, this.state.y);

        let group = window.document.getElementById("g-" + this.props.id);
        let titlebar = window.document.getElementById("tb-t" + this.props.id);
        let tbText = window.document.getElementById("tbt-t" + this.props.id);

        titlebar.addEventListener("mousedown", e => Drag.start(e.pageX, e.pageY));        
        tbText.addEventListener("mousedown", e => Drag.start(e.pageX, e.pageY));        
        titlebar.addEventListener("mousemove", e => Drag.move(group, e.pageX, e.pageY));
        tbText.addEventListener("mousemove", e => Drag.move(group, e.pageX, e.pageY));
        titlebar.addEventListener("mouseup", e => Drag.stop(e.pageX, e.pageY));
        tbText.addEventListener("mouseup", e => Drag.stop(e.pageX, e.pageY));
    }

    mouseDown(event) {
        this.props.raiseWindow(this.props.id);
        /*         this.startDrag(event.pageX, event.pageY);*/
    }

    touchStart(event) {
        this.props.raiseWindow(this.props.id);
        this.startDrag(event.touches[0].pageX, event.touches[0].pageY);
    }

    mouseUp(event) {
        this.setState({
            drag: false,
            moving: false,
        });

        /*         this.move(event.pageX, event.pageY);*/
    }

    touchEnd(event) {
        this.setState({
            drag: false,
            moving: false,
        });

        this.move(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    }

    mouseMove(event) {
        if (this.state.drag && !this.state.moving) {
            this.setState({
                moving: true
            });
            /*             this.move(event.pageX, event.pageY);*/
        }
    }

    touchMove(event) {
        if (this.state.drag) {
            let touch = event.changedTouches[0];
            this.move(touch.pageX, touch.pageY);
        }
    }

    closeWindow() {
        this.props.closeWindow(this.props.id);
    }

    iconizeWindow() {
        this.props.iconizeWindow(this.props.id, !this.props.iconized);
    }

    render() {
        let titlebarHeight = 32;
        let bodyY = titlebarHeight - 8;
        let bodyHeight = this.state.height - titlebarHeight;

        let outlineClass = this.state.moving ? null : "hidden";
        let windowClass = this.state.moving ? "hidden" : null;

        /*         <g transform={`translate(${this.state.x}, ${this.state.y})`} ref="me"> */

        return (
            <g id={"g-" + this.props.id}>
                <rect stroke="black" fill="transparent" className={outlineClass}
                      rx="5" width={this.state.width} height={this.state.height} />
                
                <Titlebar title={this.props.title} id={"t" + this.props.id} className={windowClass}
                          width={this.state.width} height={titlebarHeight}
                          closeButton={this.props.closeButton} iconizeButton={this.props.iconizeButton}
                          closeWindow={this.closeWindow} iconizeWindow={this.iconizeWindow}
                          touchStart={this.touchStart} touchEnd={this.touchEnd} touchMove={this.touchMove}
                          mouseDown={this.mouseDown} mouseUp={this.mouseUp} mouseMove={this.mouseMove} />
                
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
