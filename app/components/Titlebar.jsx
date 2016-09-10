import React from "react";
import Button from "components/Button";
import Text from "components/Text";
import Image from "components/Image";

let Titlebar = ({
    id,
    x = 0, y = 0,
    width, height,
    title, className,
    closeButton = false, iconizeButton = false,
    closeWindow, iconizeWindow, raiseWindow, pinWindow,
    pinned
}) => {
    let copyPathId = "cp-" + id;
    let copyPathUri = "url(#" + copyPathId + ")";

    let buttonSpace = 16;
    let clipWidth = width - 35 -
                    (buttonSpace * iconizeButton) -
                    (buttonSpace * closeButton);
    let closeButtonX = x + width - buttonSpace - 8;
    let iconizeButtonX = closeButtonX;
    if (closeButton) {
        iconizeButtonX -= 19;
        clipWidth -= buttonSpace;
    }
    
    return (
        <g className={"titlebar " + className}>
            <defs>
                <clipPath id={copyPathId}>
                    <rect x="0" y="0" width={width} height={height - 3} />
                </clipPath>
            </defs>

            <rect clipPath={copyPathUri}
                  x="0" y="0"
                  width={width} height={height}
                  onMouseDown={raiseWindow}
            />

            <Text x={32} y={0}
                  className="titlebar"
                  width={clipWidth} height={height}
                  halign="middle" valign="middle"
                  onMouseDown={raiseWindow}>
                {title}
            </Text>

            { closeButton ?
              <Button x={closeButtonX} y={8} parentX={0} parentY={0} width={16} height={16}
                      click={closeWindow}>
                  &#x2716;
              </Button> : null }

            { iconizeButton ?
              <Button x={iconizeButtonX} y={8} parentX={0} parentY={0} width={16} height={16}
                      click={iconizeWindow}>
                  &#9643;
              </Button> : null }

              <Button x={8} y={8} parentX={0} parentY={0} width={16} height={16}
                      pushed={pinned}
                      click={pinWindow}>
                  <Image src={ pinned ? "pindown.png" : "pinleft.png" } x={pinned ? 0 : -2} sw={14} sh={14} width={16} height={16} />
            </Button>
        </g>
    );
}

export default Titlebar;
