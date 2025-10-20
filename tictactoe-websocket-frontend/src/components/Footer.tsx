import styled from "styled-components";

const FooterLayout = styled.footer`
    background: ${({ theme }) => theme.colors.primary};
    position: sticky;
    bottom: 0;
    z-index: 10;
`;

const FooterContentBox = styled.div`
    text-align: center;
`;

const CopyrightText = styled.p`
    color: white;
    padding: 10px;
`;



const Footer = () => {

    return (
        <FooterLayout>
            <FooterContentBox>
                <CopyrightText>Copyright 2025. yunjinkang. All rights reserved.</CopyrightText>
            </FooterContentBox>
        </FooterLayout>
    );
};

export default Footer;