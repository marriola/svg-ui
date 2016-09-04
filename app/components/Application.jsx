import React from "react";
import Window from "components/Window";
import Button from "components/Button";
import Image from "components/Image";

let Application = () => (
    <g>
        <Window title="hello" x={10} y={10} width={192} height={128}>
            <Button x={5} y={5} width={30} height={20} click={window.alert.bind(null, 'click')}>
                OK
            </Button>

            <Button x={45} y={5} width={128} height={64} click={window.alert.bind(null, "jagshemash!")}>
                <Image src="kazakhstan.gif" width={96} height={48} />
            </Button>
        </Window>
    </g>
);

export default Application;
