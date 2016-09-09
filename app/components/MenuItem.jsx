import React from "react";
import autobind from "autobind-decorator";
import TopMenuItem from "components/TopMenuItem";
import SubMenuItem from "components/SubMenuItem";

export default class MenuItem extends React.Component {
    render() {
        if (true || this.props.parent.type.name == "Menu") {
            return <TopMenuItem {...this.props} parent={this} />
        }
        else {
            if (this.props.children.length == 0) {
                return <SubMenuItem {...this.props} parent={this} />
            }
            else {
                return <SubMenu {...this.props} parent={this} />
            }
        }
    }
}
