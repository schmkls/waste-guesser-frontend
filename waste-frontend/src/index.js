import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UploadAndDisplayImage from './uploadAndDisplayImage/UploadAndDisplayImage';
import TagsInput from './tagsInput/TagsInput';
import Results from './results/Results';


const BASE_URL = 'http://127.0.0.1:8000/waste'

export default function App() {

    const [image, setImage] = useState();      //used to get image from child component
    const [imageId, setImageId] = useState(); //used to fetch results
    const [tags, setTags] = useState([]);     //used to fetch results
    const [ewcGuesses, setEwcGuesses] = useState([]);   //results
    const [isLoading, setIsLoading] = useState(false);

    //upload image and get id
    useEffect(() => {
        if (!image) {
            setImageId(null);
            return;
        }
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('image', image, image.name);

        fetch(`${BASE_URL}/image-upload/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setImageId(data['id'])
        })
        .catch(error => {
            console.error('Failed to upload image:', error);
        });
    }, [image])

    //get ewcs from tags and image id
    useEffect(() => {
        setIsLoading(true);
        let url = `${BASE_URL}/tags-guess?`
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
                            guesses.push({
                                "code": data[key]['ewc']["code"],
                                "description": data[key]["ewc"]["description"],
                                "percentage": data[key]['probability']
                            })
                        }
                        setEwcGuesses(guesses)
                        setIsLoading(false);
                    })
            }, (error) => {
                console.log('error: ', error);
                setIsLoading(false);
            })
    }, [tags])


    useEffect(() => {
        setIsLoading(true);
        let url = `${BASE_URL}/barcode-guess/?image_id=4`
    }, [imageId])


    
    return (
        <div>
            <UploadAndDisplayImage onUpload={(img) => setImage(img)} />
            <TagsInput
                onTags={(words) => setTags(words)}
                onSingleTag={(tag) => setTags([...tags, tag])} />
            {
                isLoading ? <p>Loading...</p> : null
            }
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
