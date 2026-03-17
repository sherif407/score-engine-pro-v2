import {useEffect,useState} from "react"
import api from "../api"
import {useNavigate} from "react-router-dom"
export default function Home(){
const [games,setGames]=useState([])
const nav=useNavigate()
useEffect(()=>{api.get("/games").then(r=>setGames(r.data))},[])
function newGame(){
api.post("/game",{players:["A","B","C","D"]})
.then(r=>nav("/game/"+r.data.id))
}
return(<div>
<h1>Score Engine Pro</h1>
<button onClick={newGame}>New Game</button>
{games.map(g=>(<div key={g.id}>
{g.id}
<button onClick={()=>nav("/game/"+g.id)}>Open</button>
</div>))}
</div>)
}