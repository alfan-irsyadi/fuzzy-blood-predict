import { useState } from 'react'
import logo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWindowDimensions from './screenSize'
import bloodBank from './assets/blood-bank.png'
import dataset from './data.json'

function App() {
  const [golda, setGolda] = useState('A')
  const data = dataset[golda]
  const [minPersediaan, maxPersediaan] = data['persediaan']
  const [minPermintaan, maxPermintaan] = data['permintaan']
  const [minPenerimaan, maxPenerimaan] = data['penerimaan']
  const {height, width} = useWindowDimensions()
  const rasio = width / height
  function update(){
    dataset[golda]['persediaan'] = [minPersediaan, maxPersediaan]
  }
  console.log(dataset[golda])
  // console.log(height, width)
  return (
    <div className=''>
      <nav className='navbar'>
        <div className="logo">
          <div>
            <img src={bloodBank} height={60} width={60} alt="" srcset="" />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-red-600'>Fuzzy Blood Predict</span>
            <span className='text-xs'>Vira Amalia Putri - Universitas Sumatera Utara</span>
          </div>
        </div>

      </nav>
      <div className={'flex grid-cols-3 ' + (rasio < 3 / 2 ? 'mobile' : 'desktop h-screen ') + ' shadow-2xl'}>
        <div className='bg-white my-auto h-full px-10 py-4 items-center flex flex-col col-span-2'>
          <div className='flex flex-row text-left py-4 border-b-2 border-b-red-600 justify-start w-full font-bold text-2xl mb-4'>
            <h1>Update Semesta</h1>
          </div>
          <form action="" className='grid grid-cols-2 gap-x-10'>
          <div className='col-span-2'>
              <span>Golongan Darah:</span>
              <div className="option-golda bg-gray-100 justify-evenly py-2 my-2 shadow-xl">
                <div className='input-radio'>
                  <input type="radio"
                    name="golda" id="radio_A"
                    className='golda' value={"A"}
                    checked={golda == 'A'}
                    onChange={e => setGolda(e.target.value)} />
                  <label htmlFor="A">A+</label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="golda" id="radio_B" className='golda' value={"B"} 
                  checked={golda == 'B'}
                  onChange={e=>setGolda(e.target.value)}/>
                  <label htmlFor="B">B+</label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="golda" id="radio_AB" className='golda' value={"AB"}
                  checked={golda == 'AB'}
                  onChange={e=>setGolda(e.target.value)}/>
                  <label htmlFor="AB">AB+</label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="golda" id="radio_O" className='golda' value={"O"}
                  checked={golda == 'O'}
                  onChange={e=>setGolda(e.target.value)}/>
                  <label htmlFor="O">O+</label>
                </div>
              </div>
            </div>
            
            {
              ['persediaan', 'permintaan', 'penerimaan'].map(x => {
                // 
                return <>
                  <div className='div-input'>
                    <label htmlFor={'min-' + x}>Minimum {x}</label>
                    <input type="number" name={'min-' + x} className='input' value={data[x][0]}/>
                  </div>
                  <div className='div-input'>
                    <label htmlFor={'max-' + x}>Maksimum {x}</label>
                    <input type="number" name={'max-' + x} className='input' value={data[x][1]}/>
                  </div>
                </>
              })
            }
            
            <button type="button" className='bg-red-600 h-8 text-white font-bold shadow-xl my-4' onClick={()=>{}}>Update</button>
          </form>
        </div>
        <div className='px-10 py-4 bg-red-600 col-span-1 text-white'>
          <div className='flex flex-row text-left justify-start border-b-2 py-4 border-b-white w-full font-bold text-2xl mb-4'>
            <h1>Prediksi Penerimaan</h1>
          </div>
          <form action="" className=''>
            <div className='div-input'>
              <label htmlFor="persediaan">Jumlah Persediaan</label>
              <input type="number" name='persediaan' className='input' />
            </div>
            <div className='div-input'>
              <label htmlFor="permintaan">Jumlah Permintaan</label>
              <input type="number" name='permintaan' className='input' />
            </div>

            <button type="button" className='my-4 bg-green-800 px-4 py-2'>Prediksi</button>
          </form>
        </div>
      </div>
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
