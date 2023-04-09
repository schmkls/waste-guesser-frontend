import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UploadAndDisplayImage from './uploadAndDisplayImage/UploadAndDisplayImage';
import TagsInput from './tagsInput/TagsInput';
import Results from './results/Results';


export default function App() {

    const [image, setImage] = useState();
    const [tags, setTags] = useState([]);
    const [ewcGuesses, setEwcGuesses] = useState([]);

    useEffect(() => {
        //placeholder for actual guess call
        console.log('tags: ', tags);
        let url = 'http://127.0.0.1:8000/waste/simple-guess?'
        for (const tag of tags) {
            url = url + 'tags=' + tag + '&'
        }

        fetch(url)
            .then((ewcs) => {
                ewcs.json()
                    .then((data) => {
                        console.log('data: ', data);
                        let guesses = []
                        for (let key in data) {
                            console.log('data[key]: ', data[key]['probability']);
                            guesses.push({
                                "code": data[key]['ewc']["code"],
                                "description": data[key]["ewc"]["description"],
                                "percentage": data[key]['probability']
                            })
                        }
                        setEwcGuesses(guesses)
                    })
            }, (error) => {
                console.log('error: ', error);
            })

        console.log('tags inx: ', tags);
    }, [tags, image])

    return (
        <div>
            <UploadAndDisplayImage onUpload={(img) => setImage(img)} />
            <TagsInput
                onTags={(words) => setTags(words)}
                onSingleTag={(tag) => setTags([...tags, tag])} />
            <Results
                ewcGuesses={ewcGuesses /*placeholder */}
            />
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
