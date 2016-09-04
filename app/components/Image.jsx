import React from "react";

let Image = ({
    src,
    x = 0,
    y = 0,
    width, height,
    clipPath,
    onMouseUp,
    onMouseDown,
    onMouseLeave
}) => (
    <image xlinkHref={src} x={x} y={y} width={width} height={height} clipPath={clipPath}
           onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} />
);

Image.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    src: React.PropTypes.string
};

export default Image;
