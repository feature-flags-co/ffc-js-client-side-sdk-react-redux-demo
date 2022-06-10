import { Counter } from './features/counter/Counter';
import './App.css';
import { useAppSelector } from './app/hooks';
import { selectFfc } from './app/ffcSlice';

function App() {

  const ffc = useAppSelector(selectFfc);
  return (
    <div className="App">
      <header className="App-header">
      <div>Hello { ffc["hello"] } </div>
      {
        ffc['counter'] === 'true' ?
        <Counter /> : ''
      }
      </header>
    </div>
  );
}

export default App;
