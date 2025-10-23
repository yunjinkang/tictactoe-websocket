import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Mark = "X" | "O" | null;

interface GameRoom {
  roomId: string;
  roomName: string;
  host: string;
  players: string[];
  status: "waiting" | "playing";
  board: Mark[];
  turn: Mark;
}


const GamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [room, setRoom] = useState<GameRoom | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // 테스트용 더미 데이터
    const dummyRoom: GameRoom = {
      roomId,
      roomName: "테스트방",
      host: "방장",
      players: ["방장", "게스트"],
      status: "waiting",
      board: Array(9).fill(null),
      turn: null,
    };

    const timer = setTimeout(() => {
      setRoom(dummyRoom);
    }, 1000);


    // const socket = new SockJS("http://localhost:8080/ws");
    // const client = new Client({
    //   webSocketFactory: () => socket,
    //   reconnectDelay: 5000,
    // });

    // client.onConnect = () => {
    //   console.log("✅ Connected to WebSocket");

    //   // 방 정보 구독
    //   client.subscribe(`/topic/room/${roomId}`, (message) => {
    //     const updatedRoom: GameRoom = JSON.parse(message.body);
    //     setRoom(updatedRoom);
    //   });

    //   // 방 참여 요청
    //   client.publish({
    //     destination: `/app/room/join/${roomId}`,
    //     body: JSON.stringify({}),
    //   });
    // };

    // client.activate();
    // setStompClient(client);

    // // cleanup
    // return () => {
    //   if (client.active) {
    //     client.deactivate();
    //   }
    // };


    return () => clearTimeout(timer);
  }, [roomId]);

  // 게임 시작
  const handleStart = () => {
    if (!room) return;

    const randomTurn: Mark = Math.random() < 0.5 ? "X" : "O";

    setRoom({
      ...room,
      status: "playing",
      board: Array(9).fill(null),
      turn: randomTurn,
    });


    // stompClient?.publish({ 
    //   destination: `/app/room/start/${roomId}`,
    //   body: JSON.stringify({turn: randomTurn}),
    // });

  };

  // 퇴장
  const handleLeave = () => {
    // stompClient?.publish({
    //   destination: `/app/room/leave/${roomId}`,
    //   body: JSON.stringify({}),
    // });
    navigate("/"); // 홈으로 돌아가기
  };

  const handleCellClick = (index: number) => {
    if (!room || room.status !== "playing" || room.board[index]) return;

    const newBoard = [...room.board];
    newBoard[index] = room.turn;
    const nextTurn: Mark = room.turn === "X" ? "O" : "X";

    setRoom({
      ...room,
      board: newBoard,
      turn: nextTurn,
    });
  };

  return (
    <div style={{ color: "white", padding: "2rem" }}>

      {room ? (
        <>
          <h2>🎮 틱택토 방: {room.roomName}</h2>
          <p>👑 방장: {room.host}</p>
          <p>🧍 플레이어 수: {room.players.length}</p>
          <p>⚙️ 상태: {room.status === "waiting" ? "대기 중" : "게임 중"}</p>

          {room.status === "waiting" && room.players.length === 2 && (
            <button onClick={handleStart}>게임 시작하기</button>
          )}

          <button onClick={handleLeave} style={{ marginLeft: "1rem" }}>
            퇴장하기
          </button>

          {/* 보드 UI */}
          {room.status === "playing" &&(
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 100px)",
                gap: "10px",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              {room.board.map((mark, i) => (
                <div
                  key={i}
                  onClick={() => handleCellClick(i)}
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#1f2937",
                    border: "2px solid #4b5563",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    cursor: room.status === "playing" && !mark ? "pointer" : "default",
                    borderRadius: "0.5rem",
                    transition: "background 0.2s",
                  }}
                >
                  {mark}
                </div>
              ))}
            </div>
          </div>
          )}
        </>
      ) : (
        <p>🔄 방 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GamePage;
