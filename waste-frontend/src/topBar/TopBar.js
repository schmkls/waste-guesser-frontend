import './TopBar.css'

const TopBar = () => {
    return (
        <div className='topBar'>
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