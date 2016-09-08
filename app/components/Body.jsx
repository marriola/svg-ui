import React from "react";

let Body = ({id, x, y, width, height, className, raiseWindow, children }) => {
    children = React.Children.map(children, x => React.cloneElement(x, {
        id
    }));

    let cpId = "cp-" + id;
    let bodyCpId = "b" + cpId;
    let cpUri = "url(#" + cpId + ")";
    let bodyCpUri = "url(#" + bodyCpId + ")";

    return (
        <g className={"body " + className}>
            <defs>
                <clipPath id={cpId}>
                    <rect x={x} y={y + 5}
                          width={width} height={height}
                    />                    
                </clipPath>
                <clipPath id={bodyCpId}>
                    <rect x={x} y={y - 25}
                          width={width} height={height}
                    />
                </clipPath>
            </defs>

            <rect clipPath={cpUri}
                  x="0" y={y}
                  width={width} height={height + 5}
                  className="body"
                  onMouseDown={raiseWindow}
            />

            <g transform={`translate(0, 30)`}
               clipPath={bodyCpUri}
               onClick={raiseWindow}>
                {children}
            </g>
        </g>
    );
};

export default Body;
