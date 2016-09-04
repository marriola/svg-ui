import React from "react";
import { uniqueIdentifier } from "utils";

export default class Button extends React.Component {
    static propTypes = {
        x: React.PropTypes.number,
        y: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        px: React.PropTypes.number,
        py: React.PropTypes.number
    };
    
    constructor(props) {
        super(props);

        this.state = {
            id: "btn" + uniqueIdentifier(),
            pushed: false
        };

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseDown() {
        this.setState({
            pushed: true
        });
    }

    mouseUp() {
        if (this.state.pushed) {
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    this.props.click();
                }, 0);
            });
        }

        this.setState({
            pushed: false
        });
    }
    
    mouseLeave() {
        this.setState({
            pushed: false
        });
    }

    render() {
        let x = this.props.x; // + this.props.parentX;
        let y = this.props.y; // + this.props.parentY;
        let { width, height } = this.props;

        let topLeft = this.state.pushed ? "dark" : "light";
        let bottomRight = this.state.pushed ? "light" : "dark";

        let cpId = "cp-" + this.state.id;
        let cpUri = "url(#" + cpId + ")";

        let children;
        let offsetX = this.state.pushed ? 1 : 0;
        let offsetY = this.state.pushed ? 1 : 0;

        if (typeof(this.props.children) === "string") {
            children =
                <text x={width / 2} y={height / 2} fill="white"
                      clipPath={cpUri}
                      fontSize="10pt"
                      alignmentBaseline="middle" textAnchor="middle"
                      onTouchEnd={this.mouseUp} onMouseUp={this.mouseUp} onTouchStart={this.mouseDown} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave}>
                    {this.props.children}
                </text>;
        }
        else {
            children = React.Children.map(this.props.children, e => {
                offsetX += (this.props.width - e.props.width - 2) / 2 + 1;
                offsetY += (this.props.height - e.props.height - 2) / 2 + 1;

                return React.cloneElement(e, {
                    clipPath: cpUri,
                    onMouseUp: this.mouseUp,
                    onTouchEnd: this.mouseUp,
                    onMouseDown: this.mouseDown,
                    onTouchStart: this.mouseDown,
                    onMouseLeave: this.mouseLeave
                });
            });
        }

        children = 
            <g transform={`translate(${offsetX}, ${offsetY})`}>
                {children}
            </g>;

        return (
            <g transform={`translate(${x}, ${y})`} className="button">
                <defs>
                    <clipPath id={cpId}>
                        <rect x="0" y="0" width={width} height={height} />
                    </clipPath>
                </defs>
                
                <rect x="0" y="0" width={width} height={height}
                      onTouchEnd={this.mouseUp} onMouseUp={this.mouseUp} onTouchStart={this.mouseDown} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />
                
                <line x1={0} y1={height} x2={0} y2={0} className={topLeft} />
                <line x1={0} y1={0} x2={width} y2={0} className={topLeft} />
                <line x1={width} y1={0} x2={width} y2={height} className={bottomRight} />
                <line x1={width} y1={height} x2={0} y2={height} className={bottomRight} />

                {children}
            </g>
        );
    }
}
