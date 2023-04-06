import { useState, useEffect } from "react";

const Results = ({ewcGuesses}) => {

    return (
        <div>
            <ul>
                {
                    ewcGuesses.map((guess, index) => 
                        <div key={index}>
                            <h3>{guess["percentage"]}%</h3>
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