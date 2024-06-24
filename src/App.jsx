// import { useEffect,useCallback } from "react"

import { useCallback, useState,useEffect,useRef } from "react"

function App() {
    const [password,setPassword]=useState("")
    const [numAllowed,setNumAllowed]=useState(false)
    const [charAllowed,setCharAllowed]=useState(false)
    const [range,setRange]=useState(8);
    
    function hasChar(pass) {
      for (let index = 0; index < pass.length; index++) {
        let ascii = pass.charCodeAt(index);
        if((ascii>=33 && ascii<=47) || (ascii>=58 && ascii<=64) || (ascii>=123 && ascii<=126)) return true;
      }
      return false;
    }

    function hasNum(pass) {
      for (let index = 0; index < pass.length; index++) {
        let ascii = pass.charCodeAt(index);
        if(ascii>=48 && ascii<=57) return true;
      }
      return false;
    }
    
    const passwordGenerator=useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numAllowed) str+="0123456789";
        if (charAllowed) str+="!@#$%^&*-_.+=/[]{}`;:<=>?~"
        for (let i = 0; i < range; i++) {
          let char=str.charAt(Math.floor(Math.random()*str.length))
          pass+=char
        }
        //to cross chk password must contain specail chars or num if user need
        if(numAllowed && charAllowed){
          if(!(hasChar(pass) && hasNum(pass))) return passwordGenerator()
        }else if(numAllowed){
          if(!hasNum(pass)) return passwordGenerator()
        }else if(charAllowed){
          if(!hasChar(pass)) return passwordGenerator()
        }
        setPassword(pass)
      },[range,numAllowed,charAllowed])

      //copy
      //useRef hook
      const passwordRef = useRef(null)

      function copyPasswordToClickBoard(){
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
        let btn=document.getElementById("btn");
        btn.innerHTML="Copied";
        btn.style.color="yellow";
        setTimeout(() => {
          btn.innerHTML="Copy";
          btn.style.color="white";
          passwordRef.current?.setSelectionRange(0, 0);
        }, 3000);
      }

    useEffect(()=>{
      passwordGenerator()
    },[range,numAllowed,charAllowed])
  

  return (
    <>
      <div className="w-full h-screen bg-amber-600 flex flex-row justify-center p-4">
        <div className="w-1/2 h-[20%] bg-amber-900 rounded-2xl m-20 flex flex-col">
          <div className="flex flex-row w-45 h-20 justify-center">
            <input type="text" className="outline-none w-2/3 my-4  text-2xl rounded-l-xl" value={password} ref={passwordRef} readOnly/>
            <button id="btn" onClick={()=>{copyPasswordToClickBoard()}} className="bg-orange-600 my-4 border-none w-14  flex items-center justify-center rounded-r-xl text-white">Copy</button>

          </div>
          <div className="flex flex-row gap-4 m-auto  text-2xl ">
            <div className="flex flex-row gap-2">
              <input type="range" min={8} max={100} defaultValue={range} onChange={(e)=>{setRange(e.target.value)}} className="range range-2xl w-[170px] h-29" /> 
              <label className="text-white">Length({range})</label>
            </div>
            <div className="flex flex-row gap-2">
              <input 
              type="checkbox" id="number" className="size-5 mt-2" 
              defaultChecked={numAllowed} 
              onChange={()=>{setNumAllowed((prev)=>!prev)}}   /> 
              <label className="text-white " htmlFor="number">Number</label>
            </div>
            <div className="flex flex-row gap-2 " >
              <input 
              type="checkbox" className="size-5 mt-2" 
              defaultChecked={charAllowed}
              onChange={()=>{setCharAllowed((prev)=>!prev)}}
               /> 
              <label className="text-white">Character</label>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default App
