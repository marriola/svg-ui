import React from "react";

let Body = ({id, x, y, width, height, className, children }) => {
    children = React.Children.map(children, x => React.cloneElement(x, { id }));

    return (
        <g className={className}>
            <defs>
                <clipPath id={"cp-" + id}>
                    <rect x={x} y={y + 5}
                          width={width} height={height}
                    />
                </clipPath>
            </defs>

            <rect clipPath={`url(#cp-${id})`} rx="5"
                  x="0" y={y}
                  width={width} height={height + 5}
                  style={{ fill: "#555" }}
            />

            {children}
        </g>
    );
};

export default Body;
