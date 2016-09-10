import React from "react";

/*
 *  Displays an image
 *
 *  x
 *  y
 *  sw
 *  sh
 *  width
 *  height
 *  clipPath
 */
let Image = ({
    src,
    x = 0,
    y = 0,
    sw, sh,
    width, height,
    clipPath,
    fit,
    ...props
}) => {
    if (!sw) {
        sw = width;
        sh = height;
    }
    else if (!width) {
        width = sw;
        height = sh;
    }
    else if (fit && sw > width) {
        let ratio = width / sw;
        sw = width;
        sh *= ratio;
    }
    else if (fit && sh > height) {
        let ratio = height / sh;
        sh = height;
        sw *= ratio;
    }

    return (
        <image {...props}
               xlinkHref={src}
               x={x + (width - sw) / 2} y={y + (height - sh) / 2}
               width={sw} height={sh} clipPath={clipPath}
        />
    );
};

Image.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    sw: React.PropTypes.number,
    sh: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    src: React.PropTypes.string
};

export default Image;
