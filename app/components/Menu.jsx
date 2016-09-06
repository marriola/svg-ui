import React from "react";
import autobind from "autobind-decorator";

export default class Menu extends React.Component {
    static ITEM_SPACE = 5;

    constructor(props) {
        super(props);

        this.itemSizes = {};
        
        this.state = {
            itemOrder: null,
            itemSizes: {},
            itemPositions: {},
            itemIds: React.Children.map(props.children, x => x.id)
        };
    }

    resolveSize(id, rect) {
        this.itemSizes = {
            ...this.itemSizes,
            [id]: rect
        };

        let itemPositions = this.calculatePositions(this.itemSizes);
        
        this.setState({ itemSizes: this.itemSizes, itemPositions });
    }

    calculatePositions(sizes) {
        let widths = [];
        let positions = [];

        for (let item of this.props.children) {
            if (item.type.name == "MenuItem" && sizes[item.props.id]) {
                let order = this.state.itemOrder[item.props.id];
                widths[order] = sizes[item.props.id].width;  
            }
        }

        let sum = Menu.ITEM_SPACE;
        for (let w of widths) {
            positions.push(sum);
            sum += w + Menu.ITEM_SPACE;
        }

        return positions;
    }

    componentWillMount() {
        let i = -1;
        let itemOrder = {};
        
        React.Children.forEach(this.props.children, e => {
            i++;
            itemOrder[e.props.id] = i;
        });
        
        if (!this.state.itemOrder) {
            this.setState({ itemOrder });
        }
    }
    
    render() {
        let { x, y, width } = this.props.window.props;

        // Since it isn't straightforward to calculate text size before rendering an SVG element,
        // what we'll do is have each MenuItem initially render its text hidden. Each then takes
        // the size of its text and reports it to the Menu, which sets each MenuItem's coordinates.
        let order = -1;
        let children = React.Children.map(this.props.children, e => {
            order++;
            return React.cloneElement(e, {
                rect: this.state.itemSizes[e.props.id],
                resolve: this.resolveSize.bind(this, e.props.id),
                x: this.state.itemPositions[order],
                y: 3
            });
        });

        
        return (
            <g className="menubar">
                <rect x={0} y={0} width={width} height={20} />

                {children}
            </g>
        );
    }
}
