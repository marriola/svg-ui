import React from "react";
import autobind from "autobind-decorator";

@autobind
export default class TopMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.mouseDown = this.mouseDown.bind(this);
        
        this.state = {
            rendered: false,
            active: false
        };
    }
    
    componentDidMount() {
        console.log("did mount:", this.refs.me.getBBox());
        this.props.resolve(this.refs.me.getBBox());
        this.setState({ rendered: true });
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
