import { uniqueIdentifier } from "utils";
import { connect } from "decorators";
import React from "react";
import Application from "components/Application";
import Window from "components/Window";
import Button from "components/Button";
import Image from "components/Image";
import Text from "components/Text";
import Menu from "components/Menu";
import MenuItem from "components/MenuItem";
import VerticalLayout from "components/VerticalLayout";
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
                <Text x="5" y="5" width="148" height="20" fill="#ddd">
                    Hello
                </Text>
                
                <Image src={src} x={5} y={30} width={width} height={height} />
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
                        key={"winHello"} title="hello"
                        closeButton={false}>
                    <Button x={5} y={5} width={45} height={20}
                            click={this.openWindow.bind(this)}>
                        Open
                    </Button>

                    <Button x={60} y={5} width={112} height={64}
                            click={window.alert.bind(null, "jagshemash!")}>
                        <Image src="kazakhstan.gif" width={96} height={48} />
                    </Button>
                </Window>

                <Window x={320} y={240} width={192} height={192}
                        key={"winMenu"} title="really really really really long title"
                        closeButton={true} iconizeButton={true}>
                    <Text x={5} y={25} width={128} height={20}>Really really really really long</Text>
                    <Menu>
                        <MenuItem key={uniqueIdentifier()} id="file" title="File">
                            <MenuItem id="open" title="Open" />
                            <MenuItem id="save" title="Save" />
                            <MenuItem id="recent" title="Recent...">
                                <MenuItem id="file1" title="File 1" />
                                <MenuItem id="file2" title="File 2" />
                            </MenuItem>
                        </MenuItem>
                        <MenuItem key={uniqueIdentifier()} id="help" title="Help">
                            <MenuItem id="ursol" title="Good luck" />
                        </MenuItem>
                    </Menu>
                </Window>

                <Window x={160} y={240} width={192} height={192}
                        key={"winLayout"} title="Layout test"
                        closeButton={false}>
                    <VerticalLayout width={192} height={192} size={4}>
                        <Text valign="middle" halign="middle">One</Text>
                        <Button>Two</Button>
                        <Text valign="middle">Three</Text>
                        <Text halign="right">Four</Text>
                    </VerticalLayout>
                </Window>
            </Application>
        );
    }
}

export default Home;
