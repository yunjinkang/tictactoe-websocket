import styled from "styled-components";

const HeaderLayout = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.primary};
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 30px 20px;
`;
const HeaderTitle = styled.h1`
    font-size: 3.75rem;
    font-weight: bold;      
    color: white;
`;





const Header = () => {

    return (
        <HeaderLayout>
            <HeaderTitle>Tic Tac Toe</HeaderTitle>
        </HeaderLayout>
    );
};

export default Header;