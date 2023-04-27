import { useState } from 'react';
import Guess from './guess/Guess';
import './Results.css'

const Results = ({ewcGuesses}) => {

    const [copiedCode, setCopiedCode] = useState(null);


    return (
        <div className='results'>
            <ul>
                {
                    ewcGuesses.map((guess, index) => 
                        <Guess 
                            key={guess['code']}
                            guess={guess} 
                            isCopied={copiedCode === guess['code']} 
                            onCopy={() => setCopiedCode(guess['code'])}
                        />
                    )
                }
            </ul>
        </div>
    )
}

export default Results;