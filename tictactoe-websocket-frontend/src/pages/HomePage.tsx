import { useState } from "react";
import styled, { css } from "styled-components";
import RoomCreateModal from "../features/home/RoomCreateModal";

const HomePageLayout = styled.div`
    color: white;
`;

const RoomActionSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
`;
const RoomActionTitle = styled.h2`
    font-size: 1.875rem;
    font-weight: bold;
    display: flex;
    align-items: center;
`;
const RoomBtnBox = styled.div`
    display: flex;
    gap: 10px;
`;
const RoomCreateBtn = styled.button`
    background: #374151;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;

    &:hover{
        background: #4b5563;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
    }
`;
const RandomJoinBtn = styled.button`
    background: #374151;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;

    &:hover{
        background: #4b5563;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
    }
`;


const RoomListSection = styled.section`
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 5rem;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const RoomCardBox = styled.div`
    background: #1f2937;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #374151;
    transition: all 0.3s;

    &:hover{
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transform: scale(1.05);    
    }
`;

const RoomHeaderBox = styled.div`
    background: linear-gradient(to right, #374151, #4b5563);
    padding: 1rem;
`;
const RoomTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RoomBodyBox = styled.div`
    padding: 1.5rem;
`;
const RoomInfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;
const PlayerCntBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #d1d5db;
    font-weight: 600;
`;

interface RoomStatusProps {
    status: "waiting" | "playing";
}
const RoomStatusSpan = styled.span<RoomStatusProps>`
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    background: ${({ status }) =>
        status === "waiting" ? "rgba(97, 255, 152, 0.6)" : "rgba(252, 45, 45, 0.6)"};
    color: ${({ status }) =>
        status === "waiting" ? "#e5e7eb" : "#d1d5db"};
`;


const JoinBtn = styled.button<RoomStatusProps>`
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.75rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;

    ${({ status }) =>
        status === "waiting"
            ? css`
                background: #4b5563;
                color: white;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

                &:hover {
                    background: #6b7280;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
            `
            : css`
                background: #374151;
                color: #6b7280;
                cursor: not-allowed;
            `}
`;

const HomePage = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [roomName, setRoomName] = useState("");

    const handleCreateRoom = () => {
        console.log("방 생성:", roomName);
        setShowCreateModal(false);
        setRoomName("");
    };

    return (
        <HomePageLayout>
            <RoomActionSection>
                <RoomActionTitle>
                    게임 방 목록
                </RoomActionTitle>
                <RoomBtnBox>
                    <RoomCreateBtn onClick={() => setShowCreateModal(true)}>+ 방 생성</RoomCreateBtn>
                    <RandomJoinBtn>대기방 입장</RandomJoinBtn>
                </RoomBtnBox>
            </RoomActionSection>

            <RoomListSection>

                <RoomCardBox>
                    <RoomHeaderBox>
                        <RoomTitle>안녕!</RoomTitle>
                    </RoomHeaderBox>

                    <RoomBodyBox>
                        <RoomInfoBox>
                            <PlayerCntBox>1 / 2</PlayerCntBox>
                            <RoomStatusSpan status="waiting">대기 중</RoomStatusSpan>
                        </RoomInfoBox>
                        <JoinBtn status="waiting">입장하기</JoinBtn>
                    </RoomBodyBox>
                </RoomCardBox>

                <RoomCardBox>
                    <RoomHeaderBox>
                        <RoomTitle>반가워요</RoomTitle>
                    </RoomHeaderBox>

                    <RoomBodyBox>
                        <RoomInfoBox>
                            <PlayerCntBox>1 / 2</PlayerCntBox>
                            <RoomStatusSpan status="waiting">대기 중</RoomStatusSpan>
                        </RoomInfoBox>
                        <JoinBtn status="waiting">입장하기</JoinBtn>
                    </RoomBodyBox>
                </RoomCardBox>

                <RoomCardBox>
                    <RoomHeaderBox>
                        <RoomTitle>초보만</RoomTitle>
                    </RoomHeaderBox>

                    <RoomBodyBox>
                        <RoomInfoBox>
                            <PlayerCntBox>1 / 2</PlayerCntBox>
                            <RoomStatusSpan status="waiting">대기 중</RoomStatusSpan>
                        </RoomInfoBox>
                        <JoinBtn status="waiting">입장하기</JoinBtn>
                    </RoomBodyBox>
                </RoomCardBox>

                <RoomCardBox>
                    <RoomHeaderBox>
                        <RoomTitle>게임하자</RoomTitle>
                    </RoomHeaderBox>

                    <RoomBodyBox>
                        <RoomInfoBox>
                            <PlayerCntBox>2 / 2</PlayerCntBox>
                            <RoomStatusSpan status="playing">게임 중</RoomStatusSpan>
                        </RoomInfoBox>
                        <JoinBtn status="playing">게임 진행 중</JoinBtn>
                    </RoomBodyBox>
                </RoomCardBox>

            </RoomListSection>

            <RoomCreateModal
                show={showCreateModal}
                title="새 게임 방 만들기"
                roomName={roomName}
                setRoomName={setRoomName}
                onCancel={() => {
                    setShowCreateModal(false);
                    setRoomName("");
                }}
                onConfirm={handleCreateRoom}
            />
        </HomePageLayout>
    );
};

export default HomePage;