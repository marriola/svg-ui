import { uniqueIdentifier } from "utils";
import { connect } from "decorators";
import React from "react";
import Application from "components/Application";
import Window from "components/Window";
import Button from "components/Button";
import Image from "components/Image";
import Text from "components/Text";
import Actions from "action-creators";

@connect("app")
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            number: 1
        };
    }
    
    openWindow() {
        let x = Math.random() * (1024 - 128);
        let y = Math.random() * (768 - 64);
        
        window.openWindow(
            <Window x={x} y={y} width={128} height={64} title="woah" key={uniqueIdentifier()}>
                <Text fill="#ddd">
                    Hello #{this.state.number}
                </Text>
            </Window>
        );

        this.setState({
            number: this.state.number + 1
        });
    }

    render() {
        return (
            <Application store={this.props.store}>
                <Window key={uniqueIdentifier()} title="hello" x={10} y={10} width={192} height={128}>
                    <Button x={5} y={0} width={45} height={20} click={this.openWindow.bind(this)}>
                        Open
                    </Button>

                    <Button x={60} y={0} width={112} height={64} click={window.alert.bind(null, "jagshemash!")}>
                        <Image src="kazakhstan.gif" width={96} height={48} />
                    </Button>
                </Window>

                <Window key={uniqueIdentifier()} title="nothing in here" x={320} y={240} width={192} height={64}>
                </Window>
            </Application>
        );
    }
}

export default Home;
