import React from "react";
import { uniqueIdentifier } from "utils";
import Control from "components/Control";

const halignToTextAnchor = {
    left: "start",
    middle: "middle",
    right: "end"
};

export default class Text extends Control {
    render() {
        let {
            x = 0, y = 0,
            width, height,
            halign = "left",
            children: text
        } = this.props;

        let out = (
            <text {...this.props}
                  x={0} y={0}
                  dominantBaseline="hanging"
                  textAnchor={halignToTextAnchor[halign]}>
                {text}
            </text>
        );

        return super.render(out);
    }
}
