import {useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import api from "../api"

export default function Game(){
const {id}=useParams()
const [actual,setActual]=useState([0,0,0,0])
const [tricks,setTricks]=useState([0,0,0,0])
const [mode,setMode]=useState(null)
const [selected,setSelected]=useState(null)

function selectWinner(i){setMode("winner");setSelected(i)}
function selectLoser(i){setMode("loser");setSelected(i)}

useEffect(()=>{
if(mode==="winner" && selected!==null){
let t=[...tricks]; t[selected]=actual[selected]; setTricks(t)
}
if(mode==="loser" && selected!==null){
let sum=actual.reduce((a,b,i)=> i!==selected?a+b:a,0)
let t=[...actual]; t[selected]=13-sum; setTricks(t)
}
},[actual])

function update(i,val){
let a=[...actual]; a[i]=Number(val); setActual(a)
}

function save(){
api.post("/game/"+id+"/save",{data:{actual,tricks}})
}

return(<div>
<h2>Game {id}</h2>
{actual.map((v,i)=>(<div key={i}>
Player {i+1}
<input type="number" value={v}
onChange={e=>update(i,e.target.value)}/>
<button onClick={()=>selectWinner(i)}>Winner</button>
<button onClick={()=>selectLoser(i)}>Loser</button>
<span> Tricks: {tricks[i]}</span>
</div>))}
<button onClick={save}>Save</button>
</div>)
}