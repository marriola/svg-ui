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

        let children;
        let offX, offY;

        if (typeof(this.props.children) === "string") {
            children =
                <text x={width / 2} y={height / 2} fill="white"
                      clipPath={cpUri}
                      fontSize="10pt"
                      alignmentBaseline="middle" textAnchor="middle"
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave}>
                    {this.props.children}
                </text>;
        }
        else {
            let subchildren = React.Children.map(this.props.children, e => {
                offX = (this.props.width - e.props.width - 2) / 2 + 1;
                offY = (this.props.height - e.props.height - 2) / 2 + 1;

                return React.cloneElement(e, {
                    clipPath: cpUri,
                    onMouseUp: this.mouseUp,
                    onMouseDown: this.mouseDown,
                    onMouseLeave: this.mouseLeave
                });
            });

            
            children =
                <g transform={`translate(${offX}, ${offY})`}>
                    {subchildren}
                </g>;
        }

        return (
            <g transform={`translate(${x}, ${y})`}>
                <defs>
                    <clipPath id={cpId}>
                        <rect x="0" y="0" width={width} height={height} />
                    </clipPath>
                </defs>
                
                <rect x="0" y="0" width={width} height={height}
                      style={{ fill: "#000" }}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />

                <path d={ `M0 ${height} L0 0 L${width} 0` } stroke={topLeft}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />

                <path d={ `M${width} 0 L${width} ${height} L0 ${height}` } stroke={bottomRight}
                      onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} />
                
                {children}
            </g>
        );
    }
}
