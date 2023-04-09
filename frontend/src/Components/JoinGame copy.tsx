import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import SnakeLadder from "./SnankLadder";
function JoinGame() {
  const [PlayerUsername, setPlayerUsername] = useState<any>("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState<any>(null);

  const createChannel = async () => {

    const response = await client.queryUsers({ name: { $eq: PlayerUsername } });
    console.log(client,response);
    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

  
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <SnakeLadder />
        </Channel>
      ) : (
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
      )}
    </>
  );
}

export default JoinGame;