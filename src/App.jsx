import { useEffect, useState } from 'react'
import logo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWindowDimensions from './screenSize'
import bloodBank from './assets/blood-bank.png'
import dataset from './data.json'
import { useCookies } from 'react-cookie'
import { FuzzyLogic, rules } from './fuzzy'
import { Modal } from './modal'

const print = x => console.log(x)
var GoldaA = new FuzzyLogic([12, 413, 814], [910, 1279, 1648], [673, 1345, 2017])
GoldaA.setRules(rules)
print(GoldaA.mamdani(382, 1301))
function App() {
  const [golda, setGolda] = useState('A')
  const [cookies, setCookies] = useCookies(['dataset'])
  if (!cookies.dataset) setCookies('dataset', JSON.stringify(dataset), { path: '/' })
  const [dataForm, setDataForm] = useState(cookies.dataset)
  const [showModal, setShowModal] = useState(false)
  const [persediaan, setPersediaan] = useState(0)
  const [permintaan, setPermintaan] = useState(0)
  const [mamdani, setMamdani] = useState(0)
  const [sugeno, setSugeno] = useState(0)
  function mid(list) {
    return [list[0], (list[0] + list[1]) / 2, list[1]]
  }
  const { height, width } = useWindowDimensions()
  var muPersediaan = mid(dataForm[golda]['persediaan'])
  var muPermintaan = mid(dataForm[golda]['permintaan'])
  var muPenerimaan = mid(dataForm[golda]['penerimaan'])
  // print(muPersediaan)
  const rasio = width / height

  var GoldaA = new FuzzyLogic(muPersediaan, muPermintaan, muPenerimaan)
  GoldaA.setRules(rules)

  function predict(e) {
    setShowModal(true)
    setMamdani(Math.ceil(GoldaA.mamdani(persediaan, permintaan)))
    setSugeno(Math.ceil(GoldaA.sugeno(persediaan, permintaan)))
  }

  function update() {
    setCookies('dataset', JSON.stringify(dataForm), { path: '/' })
    window.location.reload()
  }


  function updateData(x, i, e) {
    let dataNew = dataForm[golda][x]
    dataNew[i] = parseInt(e)

    setDataForm({ ...dataForm, [x]: dataNew })
  }

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
      {/* MODAL */}
      {/* <button onClick={e=>setShowModal(true)} >Open Modal</button> */}

      <div id="id01" className={"bg-modal transition-all duration-500 ease-in-out " + (showModal ? "flex" : "-translate-y-full")}>
        <div className={'animation modal '+(rasio<3/2 ? 'w-2/3':'w-1/3')+(showModal?" ":" -translate-y-full")}>
          <div className='flex flex-row text-left shadow-xl justify-between border-b-4 p-4 border-b-red-600 w-full font-bold text-2xl mb-4'>
            <h1>Hasil Prediksi</h1>
            <button onClick={e=>setShowModal(false)}>&times;</button>
          </div>
          <div className='m-4'>
            <div className='flex flex-col my-4'>
              <span>Menggunakan Metode Mamdani</span>
              <span className='text-3xl font-bold'>{mamdani}</span>
            </div>
          </div>
          <div className='m-4'>
            <div className='flex flex-col my-4'>
              <span>Menggunakan Metode Sugeno</span>
              <span className='text-3xl font-bold'>{sugeno}</span>
            </div>
          </div>
          <div className="bg-gray-100 flex justify-end font-bold drop-shadow-xl">
          <button className='shadow-xl text-white bg-red-600 px-4 py-2 m-2' onClick={e=>setShowModal(false)}>Close</button>
          </div>
        </div>

      </div>

      {/* END */}
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
                    onChange={e => setGolda(e.target.value)} />
                  <label htmlFor="B">B+</label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="golda" id="radio_AB" className='golda' value={"AB"}
                    checked={golda == 'AB'}
                    onChange={e => setGolda(e.target.value)} />
                  <label htmlFor="AB">AB+</label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="golda" id="radio_O" className='golda' value={"O"}
                    checked={golda == 'O'}
                    onChange={e => setGolda(e.target.value)} />
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
                    <input type="number" name={'min-' + x} className='input' value={dataForm[golda][x][0]}
                      onChange={e => updateData(x, 0, e.target.value)} />
                  </div>
                  <div className='div-input'>
                    <label htmlFor={'max-' + x}>Maksimum {x}</label>
                    <input type="number" name={'max-' + x} className='input' value={dataForm[golda][x][1]}
                      onChange={e => updateData(x, 1, e.target.value)} />
                  </div>
                </>
              })
            }
            {/* <input type="submit" value="update" /> */}
            <button type="button" className='bg-red-600 h-10 text-white font-bold shadow-xl py-2 px-4 my-4' onClick={e => update()}>Update</button>
          </form>
        </div>
        <div className='px-10 py-4 bg-red-600 col-span-1 text-white'>
          <div className='flex flex-row text-left justify-start border-b-2 py-4 border-b-white w-full font-bold text-2xl mb-4'>
            <h1>Prediksi Penerimaan</h1>
          </div>
          <form action="" className=''>
            <div className='div-input'>
              <label htmlFor="persediaan">Jumlah Persediaan</label>
              <input type="number" name='persediaan' className='input text-black'
                value={persediaan} onChange={e => setPersediaan(e.target.value)} />
            </div>
            <div className='div-input'>
              <label htmlFor="permintaan">Jumlah Permintaan</label>
              <input type="number" name='permintaan' className='input text-black' value={permintaan} onChange={e => setPermintaan(e.target.value)} />
            </div>
            <button type="button" className='my-4 font-bold bg-green-800 px-4 py-2' onClick={e => predict(e)}>Prediksi</button>
          </form>
        </div>
      </div>
      <footer className='bg-black text-white flex justify-center gap-x-2'>copyright <span className='text-yellow-600'><a href="http://instagram.com/alfanirsyadi_">TensorMath</a></span>©️2024</footer>
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
