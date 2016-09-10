import React from "react";
import { uniqueIdentifier } from "utils";

export default class Control extends React.Component {
    render(content) {
        // Since all we're doing is clipping for now, render the content unmodified
        // if we're inside a layout control.
        if (this.props.parent &&
            this.props.parent.constructor &&
            this.props.parent.constructor.name.endsWith("Layout")) {
                return content;
        }

        let { x, y, width, height } = this.props;
        let cpId = uniqueIdentifier();
        let cpUri = "url(#" + cpId + ")";
        let transform = `translate(${x}, ${y})`;
        let props = { clipPath: cpUri };

        content = React.cloneElement(content, props);
        
        return (
            <g transform={transform}>
                <defs>
                    <clipPath id={cpId}>
                        <rect x={0} y={0} width={width} height={height} />
                    </clipPath>
                </defs>

                {content}
            </g>
        );
    }
}
