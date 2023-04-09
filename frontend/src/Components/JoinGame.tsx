import React, { useState } from "react";

import SnakeLadder from "./SnankLadder_copy";
function JoinGame() {
  const [PlayerUsername, setPlayerUsername] = useState<any>("");

  const [channel, setChannel] = useState<any>(null);

  const createChannel = async () => {

   

  
  };

  return (
    <>
     (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setPlayerUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )
    </>
  );
}

export default JoinGame;