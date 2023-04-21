import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import './ChosenTagsField.css';

const ChosenTagsField = (props) => {
    const tags = props.tags;

    return (
        <div className='chosenTags'>
            {
                tags.map((tag, index) => 
                    <button
                        key={index}
                        onClick={() => props.onRemove(tag)}
                    >
                        {tag}
                        <FontAwesomeIcon icon={faWindowClose} />
                    </button>
                )
            }
        </div>
    )
}

export default ChosenTagsField;