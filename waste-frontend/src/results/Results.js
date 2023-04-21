import './Results.css'
import Guess from './guess/Guess';

const Results = ({ewcGuesses}) => {

    return (
        <div className='results'>
            <ul>
                {
                    ewcGuesses.map((guess, index) => 
                        <Guess key={index} guess={guess} />
                    )
                }
            </ul>
        </div>
    )
}

export default Results;