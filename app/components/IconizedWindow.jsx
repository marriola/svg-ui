import React from "react";

export default class IconizedWindow extends React.Component {
    static WIDTH = 58;
    static SPACER = 8;

    constructor(props) {
        super(props);

        this.restore = this.restore.bind(this);

        this.state = {
            bbox: { x: -10000, y: -10000 }
        };
    }

    restore() {
        this.props.iconizeWindow(this.props.windowId, false);
    }

    componentDidMount() {
        let refId = "ref-" + this.props.windowId;
        
        this.setState({
            bbox: this.refs[refId].getBBox()
        });
    }
    
    render() {
        let middle = IconizedWindow.WIDTH / 2;
        let refId = "ref-" + this.props.windowId;
        let cpId = "cp-" + this.props.windowId;
        let cpUri = "url(#" + cpId + ")";

        let text = (
            <text ref={refId} x={middle} y={67} fill="white" textAnchor="middle"
                  clipPath={cpUri}
                  onClick={this.restore} onTouchEnd={this.restore}>
                {this.props.title}
            </text>
        );

        /*         debugger;*/
        let boxX = this.state.bbox.x - 2;
        let boxY = this.state.bbox.y;
        let boxWidth = Math.floor(this.state.bbox.width + 4);

        if (boxX < 0)
            boxX = 0;

        let textBground = (
            <rect x={boxX} y={boxY}
                  width={boxWidth}
                  height={20}
                  fill="#000"
                  clipPath={cpUri}
                  onClick={this.restore} onTouchEnd={this.restore}
            />
        );
        
        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <defs>
                    <clipPath id={cpId}>
                        <rect x={boxX} y={boxY} width={IconizedWindow.WIDTH} height={20} />
                    </clipPath>
                </defs>
                
                <image href={this.props.icon} x={5} y={5} width="48" height="48"
                       onClick={this.restore} onTouchEnd={this.restore} />

                {textBground}
                {text}
            </g>
        );
    }
}
