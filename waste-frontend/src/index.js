import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UploadAndDisplayImage from './uploadAndDisplayImage/UploadAndDisplayImage';
import WordsInput from './wordsInput/WordsInput';
import TagSelect from './tagSelect/TagSelect';
import Results from './results/Results';


export default function App() {

  const [image, setImage] = useState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    console.log('tags inx: ', tags);
  }, [tags])

  return (
    <div>
      <h2>Wihu</h2>
      <UploadAndDisplayImage onUpload={(img) => setImage(img)}/>
      <WordsInput onInput={(words) => setTags(words)}/>
      <TagSelect/>
      <Results 
        ewcGuesses={tags}
      />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
