import './TopBar.css'

const TopBar = () => {
    return (
        <div className='topBar'>
            <a href="https://www.youtube.com/channel/UCHIWvSMGVdsIW2Ht1Ya4eQA" target="_blank">Guide</a>
            <h1
                onClick={() => window.location.reload()}    
            >
                Avfallskod.se
            </h1>
            <h3>hitta rätt avfallskod</h3>
        </div>
    );
}

export default TopBar;