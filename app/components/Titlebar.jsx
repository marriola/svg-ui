import React from "react";
import Button from "components/Button";

let Titlebar = ({
    id,
    x = 0, y = 0,
    width, height,
    title, className,
    closeButton = false, iconizeButton = false,
    closeWindow, iconizeWindow,
    touchStart, mouseDown, touchEnd, mouseUp, touchMove, mouseMove
}) => {
    let copyPathId = "cp-" + id;
    let copyPathUri = "url(#" + copyPathId + ")";
    
    return (
        <g className={"titlebar " + className}>
            <defs>
                <clipPath id={copyPathId}>
                    <rect x="0" y="0" width={width} height={height - 3} />
                </clipPath>
            </defs>

            <rect id={"tb-" + id}
                  clipPath={copyPathUri} rx="7"
                  x="0" y="0"
                  width={width} height={height}
                  onTouchStart={touchStart} onMouseDown={mouseDown} onTouchEnd={touchEnd} onMouseUp={mouseUp} onTouchMove={touchMove} onMouseMove={mouseMove}
            />
            
            <text id={"tbt-" + id }
                  x={width / 2} y={height / 2}
                  textAnchor="middle"
                  onTouchStart={touchStart} onMouseDown={mouseDown} onTouchEnd={touchEnd} onMouseUp={mouseUp} onTouchMove={touchMove} onMouseMove={mouseMove}>
                {title}
            </text>

            { closeButton ?
              <Button x={8} y={8} parentX={0} parentY={0} width={16} height={16}
                      click={closeWindow}>
                  &#x2716;
              </Button> : null }

            { iconizeButton ?
              <Button x={x + width - 16 - 8} y={8} parentX={0} parentY={0} width={16} height={16}
                      click={iconizeWindow}>
                  _
              </Button> : null }
        </g>
    );
}

export default Titlebar;
