import { useState } from "react";

const WordsInput = (props) => {

    return (
        <div>
            <h3>Beskriv produkten med några ord</h3>
            <input
                type="text"
                onChange={(e) => {
                    props.onInput(e.target.value.split(" "));
                }}
            />
        </div>
    )
}

export default WordsInput;