import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.setState({
            pushed: false
        });

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                this.props.click();
            }, 0);
        });
    }
    
    mouseLeave() {
        this.setState({
            pushed: false
        });
    }

    render() {
        let x = this.props.x + this.props.parentX;
        let y = this.props.y + this.props.parentY;
        let { width, height } = this.props;

        let topLeft = this.state.pushed ? "gray" : "white";
        let bottomRight = this.state.pushed ? "white" : "gray";

        let cpId = "btn-" + this.props.id;
        let cpUri = "url(#" + cpId + ")";
        
        return (
            <g>
                <defs>
                    <clipPath id={cpId}>
                        <rect x={x} y={y} width={width} height={height} />
                    </clipPath>
                </defs>
                
                <rect x={x} y={y} width={width} height={height}
                      style={{ fill: "#000" }}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />

                <path d={ `M${x} ${y + height} L${x} ${y} L${x + width} ${y}` } stroke={topLeft}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />

                <path d={ `M${x + width} ${y} L${x + width} ${y + height} L${x} ${y + height}` } stroke={bottomRight}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />

                <text x={x + width / 2} y={y + height / 2} fill="white"
                      clipPath={cpUri}
                      fontSize="10pt"
                      alignmentBaseline="middle" textAnchor="middle"
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave}>
                    {this.props.text}
                </text>
            </g>
        );
    }
}
