import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {

  let [length, setLength] = useState(8);
  let [noAllow, setNoAllow] = useState(false)
  let [charAllow, setCharAllow] = useState(false)
  let [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  useEffect(() => {
    generatePassword();
  }, [length, noAllow, charAllow])

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(noAllow) str += "0123456789"

    if(charAllow) str += "!@#$%^&*()+"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, noAllow, charAllow])

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    alert(`${password} is copied`)
  }

  return (
    <div className="App">
      <div style={{ backgroundColor: 'black', width: '100%', height: '100vh' }}>
        <div className='d-flex justify-content-center'>
          <div className='w-75 h-25 p-2 mt-3 rounded-pill bg-secondary '>

            <div class="input-group my-3 px-5">
              <input type="text" class="form-control" value={password} ref={passwordRef} readOnly/>
              <button className='input-group-text bg-primary text-white px-5' onClick={copyPassword}>Copy</button>
            </div>

            <div className='text-white'>
              <input type="range" value={length} min={6} max={20}  onChange={(e) => setLength(e.target.value)}></input>
              <label className='ms-2'>Length: {length}</label>

              <input type="checkbox" id="number" onChange={() => {setNoAllow((prev) => !prev) }} defaultChecked={noAllow} className='ms-5 form-check-input'></input>
              <label className='ms-2' htmlFor="number">Numbers</label>

              <input type="checkbox" onChange={() => {setCharAllow((prev) => !prev) }} defaultChecked={charAllow} className='ms-5 form-check-input' id="character"></input>
              <label className='ms-2' htmlFor="character">Character</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
