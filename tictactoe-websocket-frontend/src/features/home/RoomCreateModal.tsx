import styled, { css } from "styled-components";

interface ModalProps {
    show: boolean;
    title: string;
    roomName: string;
    setRoomName: (value: string) => void;
    onCancel: () => void;
    onConfirm: () => void;
}

const ModalLayOut = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
`;

const ContentBox = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 28rem;
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const InputGroupBox = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.75rem;
  transition: border-color 0.2s;
  font-size: 1rem;

  &:focus {
    border-color: #6b7280;
    outline: none;
  }
`;

const ActionsBox = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ButtonBase = css`
  flex: 1;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
`;

const CancelButton = styled.button`
  ${ButtonBase};
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
`;

const ConfirmButton = styled.button<{ disabled?: boolean }>`
  ${ButtonBase};
  background: #374151;
  color: white;

  &:hover {
    background: #4b5563;
  }

  ${({ disabled }) =>
        disabled &&
        css`
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background: #374151;
      }
    `}
`;


const RoomCreateModal = ({ show, title, roomName, setRoomName, onCancel, onConfirm }: ModalProps) => {
    if (!show) return null; // show=false면 아무것도 렌더링하지 않음

    return (
        <ModalLayOut>
            <ContentBox>
                <Title>{title}</Title>

                <InputGroupBox>
                    <Label>방 이름</Label>
                    <Input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="방 이름을 입력하세요"
                        onKeyDown={(e) => e.key === "Enter" && onConfirm()}
                    />
                </InputGroupBox>

                <ActionsBox>
                    <CancelButton onClick={onCancel}>취소</CancelButton>
                    <ConfirmButton onClick={onConfirm} disabled={!roomName.trim()}>
                        만들기
                    </ConfirmButton>
                </ActionsBox>
            </ContentBox>
        </ModalLayOut>
    );
};

export default RoomCreateModal;