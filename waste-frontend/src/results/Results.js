import { useState } from 'react';
import Guess from './guess/Guess';
import './Results.css'

const Results = ({ewcGuesses}) => {

    const [copiedIndex, setCopiedIndex] = useState(null);


    return (
        <div className='results'>
            <ul>
                {
                    ewcGuesses.map((guess, index) => 
                        <Guess 
                            key={index}
                            guess={guess} 
                            isCopied={copiedIndex === index} 
                            onCopy={() => setCopiedIndex(index)}
                        />
                    )
                }
            </ul>
        </div>
    )
}

export default Results;