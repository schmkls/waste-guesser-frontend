import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UploadAndDisplayImage from './uploadAndDisplayImage/UploadAndDisplayImage';
import TagsInput from './tagsInput/TagsInput';
import Results from './results/Results';


export default function App() {

    const [image, setImage] = useState();      //used to get image from child component
    const [imageId, setImageId] = useState(); //used to fetch results
    const [tags, setTags] = useState([]);     //used to fetch results
    const [ewcGuesses, setEwcGuesses] = useState([]);   //results
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        //placeholder for actual guess call
        console.log('tags: ', tags);
        let url = 'http://127.0.0.1:8000/waste/tags-guess?'
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
        if (!image) return;

        console.log('image changed: ', image);
        // Load image from local file
        //const imageInput = document.getElementById('imageInput'); // Replace with the ID of your image file input element
        //const imageFile = imageInput.files[0];

        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('image', image, image.name);

        // Make a POST request to the API
        fetch('http://localhost:8000/waste/image-upload/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image uploaded successfully!');
            console.log(data); // Response data
        })
        .catch(error => {
            console.error('Failed to upload image:', error);
        });

    }, [image])

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
