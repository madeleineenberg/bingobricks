
import './App.css';
import BingoCard from './components/BingoCard';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-title'>
          <h1>Bingobricks</h1>
        </div>
        <div className="App-cta"><button>Play</button></div>
      </header>
      <BingoCard />
    </div>
  );
}

export default App;
