import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UploadAndDisplayImage from './uploadAndDisplayImage/UploadAndDisplayImage';
import TagsInput from './tagsInput/TagsInput';
import Results from './results/Results';
import ChosenTagsField from './tagsInput/chosenTagsField/ChosenTagsField';
import TopBar from './topBar/TopBar';
import urlAppendListParams from './helpFuncs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';

import APPLICATION_CONSTANTS from './applicationConstants';
const BAYES_SMOOTHED = 'Bayes joint probability';
const BAYES_AVERAGE = 'Bayes average probability';
const JACCARD_SIMILARITY = 'Jaccard similarity';


export default function App() {

    const [image, setImage] = useState();      //used to get image from child component
    const [imageId, setImageId] = useState(); //used to fetch results
    const [tags, setTags] = useState([]);     //used to fetch results
    const [ewcGuesses, setEwcGuesses] = useState([]);   //results
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState("")
    const [searchType, setSearchType] = useState(BAYES_SMOOTHED)

    //todo: stop guess request when image removed?
    useEffect(() => {
        setIsLoading(true);

        let url = `${APPLICATION_CONSTANTS.BASE_URL}/`
        switch (searchType) {
            case BAYES_AVERAGE:
                url = url + 'guess-bayes-average'
                break;
            case JACCARD_SIMILARITY:
                url = url + 'guess-jaccard-similarity'
                break;
            default:
                url = url + 'guess-bayes-smoothed?smoothing=0.5'
        }
        url = urlAppendListParams(url, 'tags', tags)
        if (imageId) {
            url = url + '&image_id=' + imageId
        }

        fetch(url)
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.status > 299 || response.status < 200) {
                            alert(data['error']);
                            setIsLoading(false);
                            return
                        }
                        let guesses = []
                        for (let key in data) {
                            guesses.push({
                                "code": data[key]["ewc"]["code"],
                                "description": data[key]["ewc"]["description"],
                                "percentage": data[key]["probability"]
                            })
                        }
                        setEwcGuesses(guesses)
                        setIsLoading(false);
                    })
            }, (error) => {
                alert(`Could not guess ${error}`);
                setIsLoading(false);
            })
    }, [tags, imageId, searchType])

    //upload image and get id
    useEffect(() => {
        if (!image) {
            setImageId(null);
            return;
        }
        setIsLoading(true);
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('image', image, image.name);

        fetch(`${APPLICATION_CONSTANTS.BASE_URL}/image-upload/`, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.status > 299 || response.status < 200) {
                            alert(`Could not upload image. ${data['error']}`);
                            setImageId(null);
                            return
                        }
                        setImageId(data['id'])
                    })
            })
            .catch(error => {
                console.error('Failed to upload image:', error);
                alert(`Could not upload image ${error}`);
                setImageId(null);
            });
    }, [image])


    const switchSearchType = () => {
        if (searchType === BAYES_SMOOTHED) {
            setSearchType(BAYES_AVERAGE)
        } else if (searchType === BAYES_AVERAGE) {
            setSearchType(JACCARD_SIMILARITY)
        } else {
            setSearchType(BAYES_SMOOTHED)
        }
    }


    return (
        <div>
            <TopBar />
            <div className='leftOnBigScreen'>
                <UploadAndDisplayImage onUpload={(img) => setImage(img)} />
                <TagsInput
                    onTags={(words) => setTags(words)}
                    onSingleTag={(tag) => setTags([...tags, tag])}
                />
                <ChosenTagsField
                    tags={tags}
                    onRemove={(tag) =>
                        setTags(tags.filter((t) => t !== tag))
                    }
                />
                <p>Search type: {searchType}</p>
                <button
                    onClick={() => switchSearchType()}
                >
                    <FontAwesomeIcon icon={faPlay} />
                    Switch search type
                </button>
            </div>
            <div className='rightOnBigScreen'>
                {
                    info && (
                        <h1 className='infoMessage'>info message here!{info}</h1>
                    )
                }
                {
                    isLoading && (
                        <div className='info'>
                            <h2 className='loading'>Laddar avfallskoder</h2>
                            <FontAwesomeIcon icon={faSpinner} spin size="4x" className='spinner' />
                        </div>
                    )
                }
                <Results
                    ewcGuesses={ewcGuesses}
                />
            </div>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
