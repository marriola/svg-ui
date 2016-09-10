import React from "react";
import autobind from "autobind-decorator";
import { uniqueIdentifier } from "utils";

@autobind
export default class VerticalLayout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            clipPaths: null,
            children: null,
        };
    }

    componentWillMount() {
        let size = this.props.children.length;
        let panelHeight = this.props.height / size;
        let key = "vl" + uniqueIdentifier() + "-";
        let clipPaths = [];
        
        for (let i = 0; i < size; i++) {
            clipPaths.push(
                <clipPath id={key+i}>
                    <rect x={0} y={0} width={this.props.width} height={panelHeight} />
                </clipPath>
            );
        }
        
        let index = -1;
        let that = this;
        let children = React.Children.map(this.props.children, e => {
              ++index;
            let y = index * panelHeight;
            
            return (
                <g transform={`translate(0, ${y})`}>
                    { React.cloneElement(e, {
                          "clipPath": "url(#" + key + index + ")",
                          x: 0, y: 0,
                          width: this.props.width,
                          height: panelHeight,
                          parent: that
                      }) }
                </g>
            );
        });

        this.setState({ clipPaths, children });
    }
    
    render() {
        return (
            <g>
                <defs>
                    {this.state.clipPaths}
                </defs>

                {this.state.children}
            </g>
        );
    }
}
