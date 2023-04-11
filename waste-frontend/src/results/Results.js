import { useState, useEffect } from "react";

const Results = ({ewcGuesses}) => {

    return (
        <div>
            <ul>
                {
                    ewcGuesses.map((guess, index) => 
                        <div key={index}>
                            <p>{Math.round(guess["percentage"] * 100, 2)}%</p>
                            <ul key={index}>
                                {guess["description"]} 
                            </ul>
                            <br/>
                        </div>
                        
                    )
                }
            </ul>
        </div>
    )
}

export default Results;