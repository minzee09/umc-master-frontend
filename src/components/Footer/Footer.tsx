import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImage from '@assets/logo-icon.png';
import Typography from '@components/common/typography';

const Footer: React.FC = () => (
  <FooterContainer>
    {/* TODO: 라우팅 수정 예정 */}
    <Typography variant="bodySmall">
      <FooterLinks>
        <Link to="/privacy-policy">개인정보처리방침</Link>
        <Divider>|</Divider>
        <Link to="/terms">책임의 한계와 법적 고지</Link>
        <Divider>|</Divider>
        <Link to="/support">회원정보 고객센터</Link>
      </FooterLinks>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <Logo src={LogoImage} alt="Logo" />
        <Copyright>Copyright © HOME MASTER Corp. All Rights Reserved.</Copyright>
      </div>
    </Typography>
  </FooterContainer>
);

export default Footer;

const FooterContainer = styled.footer`
  background: #f1f1f1;
  padding: 40px;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin-bottom: 16px;
  font-size: 14px;

  a {
    color: ${({ theme }) => theme.colors.text.black};
    margin: 0 8px;
  }
`;

const Divider = styled.span`
  margin: 0 14px;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const Logo = styled.img`
  height: 30px;
`;

const Copyright = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.black};
`;
