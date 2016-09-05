import { uniqueIdentifier } from "utils";
import { connect } from "decorators";
import React from "react";
import Application from "components/Application";
import Window from "components/Window";
import Button from "components/Button";
import Image from "components/Image";
import Text from "components/Text";
import Actions from "action-creators";

const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

@connect("app")
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            number: 0,
            x: 60,
            y: 30
        };
    }
    
    openWindow() {
        let index = this.state.number % 9;
        let title = planets[index];
        let src = "planets/" + planets[index] + ".png";
        let width = index == 5 ? 128 : 96;
        let height = index == 5 ? 89 : 96;
        
        window.openWindow(
            <Window x={this.state.x} y={this.state.y} width={148} height={156}
                    closeButton={true} iconizeButton={true}
                    title={title} key={uniqueIdentifier()}
                    icon={src}>
                <Text x={5} fill="#ddd">
                    Hello
                </Text>
                
                <Image src={src} x={5} y={16} width={width} height={height} />
            </Window>
        );

        this.setState({
            number: this.state.number + 1,
            x: this.state.x + 30,
            y: this.state.y + 30
        });
    }

    render() {
        return (
            <Application store={this.props.store}>
                <Window x={10} y={10} width={192} height={128}
                        key={uniqueIdentifier()} title="hello"
                        iconizeButton={true}>
                    <Button x={5} y={0} width={45} height={20}
                            click={this.openWindow.bind(this)}>
                        Open
                    </Button>

                    <Button x={60} y={0} width={112} height={64}
                            click={window.alert.bind(null, "jagshemash!")}>
                        <Image src="kazakhstan.gif" width={96} height={48} />
                    </Button>
                </Window>

                <Window x={320} y={240} width={192} height={192}
                        key={uniqueIdentifier()} title="really really really really long title"
                        closeButton={true} iconizeButton={true}>
                </Window>
            </Application>
        );
    }
}

export default Home;
