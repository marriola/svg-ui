import React from "react";
import { uniqueIdentifier } from "utils";
import Control from "components/Control";

const halignToTextAnchor = {
    left: "start",
    middle: "middle",
    right: "end"
};

const valignToBaseline = {
    top: "hanging",
    middle: "middle",
    bottom: "baseline"
};

export default class Text extends Control {
    render() {
        let {
            x = 0, y = 0,
            width, height,
            halign = "left",
            valign = "top",
            children: text
        } = this.props;

        let props = Object.assign({}, this.props);
        delete props.window;
        delete props.parent

        let anchor = halignToTextAnchor[halign];
        let baseline = valignToBaseline[valign];
        if (baseline == "middle") {
            y = height / 2;
        }
        else if (baseline == "baseline") {
            y = height;
        }

        if (anchor == "middle") {
            x = width / 2;
        }
        else if (anchor == "end") {
            x = width;
        }

        let out = (
            <text {...props}
                  x={x} y={y}
                  dominantBaseline={baseline}
                  textAnchor={anchor}>
                {text}
            </text>
        );

        return super.render(out);
    }
}
