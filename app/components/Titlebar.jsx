import React from "react";
import Button from "components/Button";

let Titlebar = ({id, x, y, width, height, title, className, mouseDown, mouseUp, mouseMove}) => {
    let copyPathId = "cp-" + id;
    let copyPathUri = "url(#" + copyPathId + ")";
    
    return (
        <g className={"titlebar " + className}>
            <defs>
                <clipPath id={copyPathId}>
                    <rect x="0" y="0" width={width} height={height - 3} />
                </clipPath>
            </defs>

            <rect clipPath={copyPathUri} rx="5"
                  x="0" y="0"
                  width={width} height={height}
                  onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseLeave={mouseUp} />
            
            <text x={width / 2} y={height / 2}
                  textAnchor="middle"
                  onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseLeave={mouseUp}>
                {title}
            </text>

            <Button x={8} y={8} parentX={0} parentY={0} width={16} height={16}
                    click={window.alert.bind(null, "BYE NOW")}>
                &#x2716;
            </Button>
        </g>
    );
}

export default Titlebar;
