import React from "react";
import autobind from "autobind-decorator";
import { uniqueIdentifier } from "utils";

export default class VerticalLayout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            clipPaths: null,
            children: null,
            panelHeight: this.props.height / this.props.size
        };
    }

    render() {
        let { clipPaths, clipPathIds, children } = this.state;
        
        if (!children) {
            let key = "vl" + uniqueIdentifier() + "-";
            clipPaths = [];
            
            for (let i = 0; i < this.props.size; i++) {
                clipPaths.push(
                    <clipPath id={key+i}>
                        <rect x={0} y={i * this.state.panelHeight} width={this.props.width} height={this.state.panelHeight} />
                    </clipPath>
                );
            }
        
            let index = -1;
            let children = React.Children.map(this.props.children, e => {
                ++index;
                let y = index * this.state.panelHeight;
                
                return (
                    <g transform={`translate(0, ${y})`}>
                        { React.cloneElement(e, {
                              "clip-path": "url(#" + key + index + ")",
                              x: 0, y: 0,
                              width: this.props.width,
                              height: this.state.panelHeight
                          }) }
                    </g>
                );
            });

            this.setState({ clipPaths, clipPathIds, children });
        }

        return (
            <g>
                <defs>
                    {clipPaths}
                </defs>

                {children}
            </g>
        );
    }
}
