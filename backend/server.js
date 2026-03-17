const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./games.db")

db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS games(
id TEXT PRIMARY KEY,
players TEXT,
data TEXT,
status TEXT,
createdAt INTEGER
)`)
})

app.post("/game", (req,res)=>{
const id = uuidv4()
db.run("INSERT INTO games VALUES(?,?,?,?,?)",
[id, JSON.stringify(req.body.players), JSON.stringify([]), "active", Date.now()])
res.json({id})
})

app.get("/game/:id",(req,res)=>{
db.get("SELECT * FROM games WHERE id=?",[req.params.id],(e,row)=>res.json(row))
})

app.post("/game/:id/save",(req,res)=>{
db.run("UPDATE games SET data=? WHERE id=?",
[JSON.stringify(req.body.data), req.params.id])
res.json({ok:true})
})

app.get("/games",(req,res)=>{
db.all("SELECT * FROM games",[],(e,rows)=>res.json(rows))
})

app.listen(4000,()=>console.log("running"))
