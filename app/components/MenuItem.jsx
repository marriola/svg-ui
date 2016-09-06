import React from "react";
import autobind from "autobind-decorator";

@autobind
export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rendered: false,
            active: false
        };
    }
    
    componentDidMount() {
        this.setState({ rendered: true });
        this.props.resolve(this.refs.me.getBBox());
    }

    mouseDown() {
        this.setState({ active: !this.state.active });
    }
    
    render() {
        return <g className={"menuitem " + (this.state.active ? "active" : "")}>
            { this.props.rect ? <rect fill="transparent" stroke="transparent"
                  x={this.props.x} y={0}
                  width={this.props.rect.width} height={this.props.rect.height}
            /> : null }
            
            <text ref="me"
                  x={this.props.x} y={this.props.y}
                  dominantBaseline="hanging"
                  onClick={this.mouseDown}>
                {this.props.title}
            </text>
        </g>;
    }
}
