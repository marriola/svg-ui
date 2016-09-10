import React from "react";
import autobind from "autobind-decorator";
import { uniqueIdentifier } from "utils";
import Text from "components/Text";

@autobind
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
    }
    
    mouseLeave() {
        this.setState({
            pushed: false
        });
    }

    click() {
        // Wait until next frame to trigger click so that we don't
        // steal focus if the event handler opens a window
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                this.props.click();
            }, 0);
        });
    }

    render() {
        let x = this.props.x;
        let y = this.props.y;
        let { width, height } = this.props;

        let topLeft = this.state.pushed || this.props.pushed  ? "dark" : "light";
        let bottomRight = this.state.pushed || this.props.pushed  ? "light" : "dark";

        let cpId = "cp-" + this.state.id;
        let cpUri = "url(#" + cpId + ")";

        let children;
        let offsetX = this.state.pushed ? 1 : 0;
        let offsetY = this.state.pushed ? 1 : 0;

        if (typeof(this.props.children) === "string") {
            children =
                <Text width={width} height={height} halign="middle" valign="middle">
                    {this.props.children}
                </Text>;
            
            /* children =
             *     <text x={width / 2} y={height / 2}
             *           clipPath={cpUri}>
             *         {this.props.children}
             *     </text>;*/
        }
        else {
            children = React.Children.map(this.props.children, e => {
                offsetX += (this.props.width - e.props.width - 2) / 2 + 1;
                offsetY += (this.props.height - e.props.height - 2) / 2 + 1;

                return React.cloneElement(e, { clipPath: cpUri });
            });
        }

        children = 
            <g transform={`translate(${offsetX}, ${offsetY})`}
               onMouseUp={this.mouseUp}
               onTouchEnd={this.mouseUp}
               onMouseDown={this.mouseDown}
               onTouchStart={this.mouseDown}
               onClick={this.click}
               onMouseLeave={this.mouseLeave}
            >
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
                      onTouchEnd={this.mouseUp} onMouseUp={this.mouseUp} onTouchStart={this.mouseDown} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave} onClick={this.click} />
                
                <line x1={0} y1={height} x2={0} y2={0} className={topLeft} />
                <line x1={0} y1={0} x2={width} y2={0} className={topLeft} />
                <line x1={width} y1={0} x2={width} y2={height} className={bottomRight} />
                <line x1={width} y1={height} x2={0} y2={height} className={bottomRight} />

                {children}
            </g>
        );
    }
}
