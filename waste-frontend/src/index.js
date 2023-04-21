import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Input from './input/Input';
import TopBar from './topBar/TopBar';
import Results from './results/Results';



export default function App() {

    const [results, setResults] = useState([]);

    return (
        <div>
            <TopBar/>
            <Input
                onResults={(ewcs) => setResults(ewcs)}
            />
            <Results
                results={results}
            />
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
