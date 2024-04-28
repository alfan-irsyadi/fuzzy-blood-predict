import { useState } from 'react'
import logo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import people1 from './assets/people1.svg'
import people2 from './assets/blood-donor.png'
import blood from './assets/blood-donation.png'
import blood2 from './assets/blood-donor (1).png'


function App() {
  const [minPersediaan, setMinPersediaan] = useState(0);
  const [maxPersediaan, setMaxPersediaan] = useState(0);
  const [minPermintaan, setMinPermintaan] = useState(0);
  const [maxPermintaan, setMaxPermintaan] = useState(0);
  const [persediaan, setPersediaan] = useState(0);
  const [permintaan, setPermintaan] = useState(0);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <div>
          <img src={blood} className="blood-logo" />
          </div>
          <div className='vira flex items-center bg-white'>
          <h1>Vira Amalia Putri</h1>
          </div>
        </div>
        <div className="menu">
          <ul className='menu'>
            <li className='menu-item'>Home</li>
            <li className='menu-item'>About</li>
          </ul>
        </div>
      </nav>
      <div className='main'>

        <div className="content">
          <form className='form-input'>
            <h1>Nilai Semesta Perhitungan</h1>
            <div className="min-max">
              <div className="input-min-max">
                <label htmlFor="min-persediaan">Persediaan Mininum</label>
                <input type="number" name="min-persediaan" id="" className='input-data' />
              </div>
              <div className="input-min-max">
                <label htmlFor="max-persediaan">Persediaan Maksimum</label>
                <input type="number" name="max-persediaan" id="" className='input-data' />
              </div>
              <div className="input-min-max">
                <label htmlFor="min-permintaan">Permintaan Mininum</label>
                <input type="number" name="min-permintaan" id="" className='input-data' />
              </div>
              <div className="input-min-max">
                <label htmlFor="max-permintaan">Permintaan Maksimum</label>
                <input type="number" name="max-permintaan" id="" className='input-data' />
              </div>
              <div className="input-min-max">
                <label htmlFor="min-penerimaan">Penerimaan Mininum</label>
                <input type="number" name="min-penerimaan" id="" className='input-data' />
              </div>
              <div className="input-min-max">
                <label htmlFor="max-penerimaan">Penerimaan Maksimum</label>
                <input type="number" name="max-penerimaan" id="" className='input-data' />
              </div>
            </div>

            <button className="button-min-max" type='button'>Fuzzyfikasi</button>
            <img src={people2} alt="" srcset="" className='people' />
          </form>
          <div className="main-input">
            <form action="" className="form-prediksi">
              <img src={blood2} alt="" className='blood2' />
              <h1>Prediksi Penerimaan Darah</h1>
              <div className="div-form-prediksi">
                <div className="input-min-max">
                  <label htmlFor="min-permintaan">Persediaan</label>
                  <input type="number" name="min-permintaan" id="" className='input-data' />
                </div>
                <div className="input-min-max">
                  <label htmlFor="max-permintaan">Permintaan</label>
                  <input type="number" name="max-permintaan" id="" className='input-data' />
                </div>
                <button type="button" className='button-defuzzifikasi'>Defuzzifikasi</button>
              </div>
            </form>
          </div>
        </div></div>
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
