import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import './Guess.css'

const Guess = ({guess}) => {

    return (
        <div className="guess">
            <button className='copyButton'
                onClick={() => navigator.clipboard.writeText(guess['description'])}
            >
                <FontAwesomeIcon icon={faCopy} size="2x"/>
            </button>
            <p className='percentage'>
                {Math.round(guess["percentage"] * 100, 2)}%
            </p>
            <p className='description'>
                {guess["description"]}
            </p>
            <br/>
        </div>
    )
}

export default Guess;