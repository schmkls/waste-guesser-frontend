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
    fetch('http://127.0.0.1:8000/waste/ewcs/')
    .then((ewcs) => {
      ewcs.json()
    .then((data) => {
      let guesses = []
      for (let key in data) {
        guesses.push({
          "code": data[key]["code"], 
          "description": data[key]["description"], 
          "percentage": 32
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
      <UploadAndDisplayImage onUpload={(img) => setImage(img)}/>
      <TagsInput 
        onTags={(words) => setTags(words)}
        onSingleTag={(tag) => setTags([...tags, tag])}/>
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
