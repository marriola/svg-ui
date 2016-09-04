import React from "react";

let Titlebar = ({id, x, y, width, height, title, className, mouseDown, mouseUp, mouseMove}) => {
    let copyPathId = "cp-" + id;
    let copyPathUri = "url(" + copyPathId + ")";
    
    return (
        <g className={className}>
            <defs>
                <clipPath id={copyPathId}>
                    <rect x="0" y="0" width={width} height={height - 3} />
                </clipPath>
            </defs>

            <rect clipPath={copyPathUri} className="titlebar" rx="5"
                  x="0" y="0"
                  width={width} height={height}
                  onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseLeave={mouseUp} />

            <text x={width / 2} y={height / 2}
                  textAnchor="middle"
                  onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseLeave={mouseUp}>
                {title}
            </text>
        </g>
    );
}

export default Titlebar;
