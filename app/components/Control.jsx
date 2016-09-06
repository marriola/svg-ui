import React from "react";
import { uniqueIdentifier } from "utils";

// So far the only thing this class does is provide positioning and clipping.
// If you're doing your own clipping, extending this class probably isn't worth it.

export default class Control extends React.Component {
    render(content) {
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
