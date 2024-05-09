import { useState } from 'react'
import logo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [minPersediaan, setMinPersediaan] = useState(0);
  const [maxPersediaan, setMaxPersediaan] = useState(0);
  const [minPermintaan, setMinPermintaan] = useState(0);
  const [maxPermintaan, setMaxPermintaan] = useState(0);
  const [persediaan, setPersediaan] = useState(0);
  const [permintaan, setPermintaan] = useState(0);

  return (
    <div>
      
    </div>

  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App
