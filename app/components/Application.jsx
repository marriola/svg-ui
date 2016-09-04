import React from "react";
import Window from "components/Window";
import Button from "components/Button";

let Application = () => (
    <g>
        <Window title="hello" x={10} y={10} width={128} height={128}>
            <Button x={5} y={5} width={30} height={20} text="OK" click={window.alert.bind(null, 'click')} />
        </Window>
    </g>
);

export default Application;
