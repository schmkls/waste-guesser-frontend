import TagSelect from './tagSelect/TagSelect';
import { useState, useEffect } from 'react';
import APPLICATION_CONSTANTS from '../applicationConstants';
import './TagsInput.css';

const TagsInput = (props) => {
    
    const [suggestedTags, setSuggestedTags] = useState(["wihu"]);
    const [inputText, setInputText] = useState("");

    const handleSubmit = (string) => {
        let tag = string
        console.log('tag: ', tag);
        if (tag[0] !== " " && tag.length > 0) {
            props.onSingleTag(tag);
        }
        setInputText("");
    }

    const handleSelect = (string) => {
        props.onSingleTag(string);
        setInputText("");
    }


    useEffect(() => {
        if (inputText.length === 0) {
            setSuggestedTags([]);
            return;
        }
 
        fetch(`${APPLICATION_CONSTANTS.BASE_URL}/tag-suggestions?text=${inputText}`)
        .then((response) => {
            if (response.status !== 200) {
                setSuggestedTags([]);
                return;
            }
            response.json()
            .then((data) => {
                console.log('suggested data', data);
                let newTags = [];
                for (let key in data) {
                    newTags.push(data[key]['word']);
                }
                setSuggestedTags(newTags);
            })
        })
    }, [inputText]);

    return (
        <div className="tagInput">
            <h3>Beskriv produkten med några ord</h3>
            <input
                placeholder='Produktnamn, ingredienser, beskrivning'
                type="text"
                value={inputText}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit(e.target.value);
                        e.target.value = "";
                    }
                }}
                onChange={(e) => {
                    if (e.target.value.includes(" ")) {
                        handleSubmit(e.target.value);
                        e.target.value = "";
                        return;
                    }
                    setInputText(e.target.value);
                }}
            />
            <TagSelect 
                onSelect={(tag) => handleSelect(tag)}
                tags = {suggestedTags}
            />
        </div>
    )
}

export default TagsInput;