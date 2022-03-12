import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Board width={ 8 } heigth={ 8 } mines={ 10 } />
    </div>
  );
}

export default App;
