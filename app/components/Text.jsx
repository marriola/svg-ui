import React from "react";

const halignToTextAnchor = {
    left: "start",
    middle: "middle",
    right: "end"
};

const Text = ({
    x = 0,
    y = 0,
    halign = "left",
    children: text,
    ...props
}) => (
    <text x={x} y={y + 10}
          textAnchor={halignToTextAnchor[halign]}
          {...props}>
        {text}
    </text>
);

export default Text;
