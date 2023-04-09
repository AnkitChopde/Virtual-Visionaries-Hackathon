import React, { useState } from "react";
import "./SnakeLadder.css";



const NUM_CELLS = 100;
const SNAKE_LADDERS:any = {
  // 14: 4,
  // 19: 8,
  // 22: 20,
  // 28: 21,
  // 36: 16,
  // 47: 26,
  // 49: 11,
  // 51: 7,
  // 56: 53,
  // 62: 18,
  // 64: 60,
  // 71: 28,
  // 87: 24,
  // 93: 73,
  // 95: 75,
  // 98: 78,
};

interface Player {
  name: string;
  pos: number;
}

const SnakeLadder = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player 1", pos: 1 },
    { name: "Player 2", pos: 1 },
    { name: "Player 3", pos: 1 },
    { name: "Player 4", pos: 1 }
  ]);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState("");
  const [rollnumber,setrollnumber]=useState("")
const [playername,setPlayersname]=useState<string>("")


  const handleRoll = () => {
    if (winner) return;
    const roll:any = Math.floor(Math.random() * 6) + 1;
    setrollnumber(roll)
    const newPlayers = [...players];
    const currentPlayer = newPlayers[turn];
    let newPos= Math.min(currentPlayer.pos + roll);
    if(newPos>100){
      newPos=currentPlayer.pos
    }
    const newPlayerPos = SNAKE_LADDERS[newPos] || newPos;
    currentPlayer.pos = newPlayerPos;
    if (newPlayerPos === NUM_CELLS) {
      setWinner(currentPlayer.name);
    } else {
      setTurn((turn + 1) % players.length);
    }
    setPlayers(newPlayers);
    setPlayersname(currentPlayer.name)

  };



 

  return (
    <>
    <div className="game-board">
      {[...Array(NUM_CELLS)].map((_, index) => (
        <div key={index} className="cell">
          
        </div>
      ))}
      {/* {players.map((player, index) => (
       
        <div
          key={index}
          className={`player player-${index}`}
          style={{
            left: `${((player.pos - 1) % 10) * 10}%`,
            bottom: `${Math.floor((player.pos - 1) / 10) * 10}%`,
          }}
        >
         
          {player.name}
        </div>
      ))} */}
      {players.map((player,index)=>{
              
              if(player.pos>=11 && player.pos<=20 || player.pos>=31 && player.pos<=40 || player.pos>=51 && player.pos<=60||
            player.pos>=71 && player.pos<=80||player.pos>=91 && player.pos<=100){
           return<div
          key={index}
          className={`player player-${index}`}
          style={{
            right: `${((player.pos - 1) % 10) * 10}%`,
            bottom: `${Math.floor((player.pos - 1) / 10) * 10}%`,
          }}
        >
         
          {player.name}
        </div>
           }else{
                return<div
          key={index}
          className={`player player-${index}`}
          style={{
            left: `${((player.pos - 1) % 10) * 10}%`,
            bottom: `${Math.floor((player.pos - 1) / 10) * 10}%`,
          }}
        >
         
          {player.name}
        </div>
           }
          })}
      {winner && <div className="winner">{winner} wins!</div>}
    </div>
    <button onClick={handleRoll} >Roll Dice</button>
    <h1>{rollnumber}</h1>
    <h1>{playername}</h1>
    </>
  );
};

export default SnakeLadder;