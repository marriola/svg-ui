import React from "react";

let Body = ({id, x, y, width, height, className, children }) => {
    children = React.Children.map(children, x => React.cloneElement(x, { id }));

    let cpId = "cp-" + id;
    let cpUri = "url(#" + cpId + ")";

    return (
        <g className={className}>
            <defs>
                <clipPath id={"cp-" + id}>
                    <rect x={x} y={y + 5}
                          width={width} height={height}
                    />
                </clipPath>
            </defs>

            <rect clipPath={cpUri} rx="7"
                  x="0" y={y}
                  width={width} height={height + 5}
                  className="body"
            />

            <g transform={`translate(0, 35)`}>
                {children}
            </g>
        </g>
    );
};

export default Body;
