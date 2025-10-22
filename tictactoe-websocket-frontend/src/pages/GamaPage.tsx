import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface GameRoom {
  roomId: string;
  roomName: string;
  host: string;
  players: string[];
  status: "waiting" | "playing";
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
    stompClient?.publish({ destination: `/app/room/start/${roomId}` });
  };

  // 퇴장
  const handleLeave = () => {
    stompClient?.publish({
      destination: `/app/room/leave/${roomId}`,
      body: JSON.stringify({}),
    });
    navigate("/"); // 홈으로 돌아가기
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
        </>
      ) : (
        <p>🔄 방 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GamePage;
