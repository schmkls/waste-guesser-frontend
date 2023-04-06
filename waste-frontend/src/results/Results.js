import { useState, useEffect } from "react";

const Results = ({ewcGuesses}) => {

    return (
        <div>
            <ul>
                {
                    ewcGuesses.map(guess => 
                        <ul>{guess}</ul>
                    )
                }
            </ul>
        </div>
    )
}

export default Results;