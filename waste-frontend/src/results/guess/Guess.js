import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useEffect } from 'react';
import './Guess.css'

const Guess = ({guess, isCopied, onCopy}) => {    

    return (
        <div className='guess'>
            <div className='copy'>
                <button className='copyButton'
                    onClick={() => {
                        navigator.clipboard.writeText(guess['description'])
                        onCopy()
                    }}
                >
                    <FontAwesomeIcon icon={faCopy} size='2x'/>
                </button>
                {
                    isCopied ? <p className='copiedInfo'>Kopierad!</p> : <></>
                }
            </div>
            <p className='description'>
                {guess['description']}
            </p>
            <p className='percentage'>
                {Math.round(guess['percentage'] * 100, 2)}%
            </p>
            <br/>
        </div>
    )
}



export default Guess;

