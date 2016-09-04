import { uniqueIdentifier } from "utils";
import React from "react";
import Application from "components/Application";
import Window from "components/Window";
import Button from "components/Button";
import Image from "components/Image";

let Home = () => (
    <Application>
        <Window key={uniqueIdentifier()} title="hello" x={10} y={10} width={192} height={128}>
            <Button x={5} y={5} width={30} height={20} click={window.alert.bind(null, 'click')}>
                OK
            </Button>

            <Button x={45} y={5} width={128} height={64} click={window.alert.bind(null, "jagshemash!")}>
                <Image src="kazakhstan.gif" width={96} height={48} />
            </Button>
        </Window>

        <Window key={uniqueIdentifier()} title="nothing in here" x={320} y={240} width={192} height={64}>
        </Window>
    </Application>
);

export default Home;
