/* eslint-disable react/prop-types */
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import { addressOptions, busanDistricts, chungcheongbukDistricts, chungcheongnamDistricts, daeguDistricts, daejeonDistricts, gangwonDistricts, gwangjuDistricts, gyeonggiDistricts, gyeongsangbukDistricts, gyeongsangnamDistricts, incheonDistricts, jejuDistricts, jeollabukDistricts, jeollanamDistricts, sejongDistricts, seoulDistricts } from "../dummyData/region_dummy";
import Button from "@components/Button/Button";
import ImgClose from "@assets/close.svg";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

interface District {
    value: string;
    label: string;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, onEdit }) => {

  const [selectedCity, setSelectedCity] = useState<string>("default");
  const [districts, setDistricts] = useState<District[]>([]);


  // 도시 선택시 구 목록을 업데이트하는 함수
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);

    switch (city) {
        case "seoul":
            setDistricts(seoulDistricts);
            break;
        case "busan":
            setDistricts(busanDistricts);
            break;
        case "incheon":
            setDistricts(incheonDistricts);
            break;
        case "daegu":
            setDistricts(daeguDistricts);
            break;
        case "daejeon":
            setDistricts(daejeonDistricts);
            break;
        case "gwangju":
            setDistricts(gwangjuDistricts);
            break;
        case "sejong":
            setDistricts(sejongDistricts);
            break;
        case "gyeonggi":
            setDistricts(gyeonggiDistricts);
            break;
        case "gangwon":
            setDistricts(gangwonDistricts);
            break;
        case "chungcheongbuk":
            setDistricts(chungcheongbukDistricts);
            break;
        case "chungcheongnam":
            setDistricts(chungcheongnamDistricts);
            break;
        case "jeollabuk":
            setDistricts(jeollabukDistricts);
            break;
        case "jeollanam":
            setDistricts(jeollanamDistricts);
            break;
        case "gyeongsangbuk":
            setDistricts(gyeongsangbukDistricts);
            break;
        case "gyeongsangnam":
            setDistricts(gyeongsangnamDistricts);
            break;
        case "jeju":
            setDistricts(jejuDistricts);
            break;
        default:
            setDistricts([]);
            break;
        }
      };

  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ProfileEditForm>
          <Close onClick={onClose}><img src={ImgClose} alt="close"/></Close>
          <Typography 
            variant="headingXxSmall"
            style={{color: theme.colors.primary[900]}}
          >프로필 변경</Typography>
          <PasswordEditForm>
            <Typography 
              variant="titleXSmall"
              style={{color: theme.colors.primary[800]}}
            >비밀번호 변경</Typography>
            <Input type={'password'} placeholder={'비밀번호 입력 (숫자, 영문자, 문자 포함 최대 10자 이내)'}/>
            <Input type={'password'} placeholder={'비밀번호 확인'}/>
          </PasswordEditForm>
          <InfoEditForm>
            <NameEditForm>
              <Typography 
                variant="titleXSmall"
                style={{color: theme.colors.primary[800]}}
              >닉네임 변경</Typography>
              <Input type={'nickname'} placeholder={'닉네임 입력 (10자 이내)'}/>
            </NameEditForm>
            <AddressEditForm>
              <Typography 
                variant="titleXSmall"
                style={{color: theme.colors.primary[800]}}
              >주소 변경 (선택)</Typography>
              <Address>
                <AddressSelect className="box" id="region-list" defaultValue={selectedCity} onChange={handleCityChange}>
                  {addressOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </AddressSelect>
                <AddressSelect className="box" id="seoul-district-list" defaultValue="default">
                  {districts.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
                </AddressSelect>
              </Address>
            </AddressEditForm>
          </InfoEditForm>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.blue[500]}}
          >※ 입력하면 해당 지역에서 진행하는 지원 프로그램 정보를 확인 할 수 있습니다.</Typography>
          <Button variant="profileEdit" onClick={() => {onEdit(); onClose(); }}>프로필 변경 완료</Button>
        </ProfileEditForm>
      </Container>
    </ModalOverlay>
  );
};

export default ProfileEditModal;

const ModalOverlay = styled.div`
  position: fixed; /* 화면에 고정되도록 설정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);;
  padding: 68px 60px 68px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소 위에 오도록 설정 */
`

const Container = styled.div`
  display: flex;
  width: 760px;
  padding: 100px 54px 63px 54px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[800]};
  background: #FFF;
`

const Close = styled.button`
  position: absolute;
  top: -60px;
  right: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const ProfileEditForm = styled.div`
  position: relative;
  display: flex;
  width: 652px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
`

const PasswordEditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`

const InfoEditForm = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  align-self: stretch;
`

const NameEditForm = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const AddressEditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  align-self: stretch;
`

const AddressSelect = styled.select`
  display: flex;
  width: 175px;
  height: 72px;
  padding: 21px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.lightGray};
  color : ${({ theme }) => theme.colors.text.black};
  background: #FFF;

  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};

  appearance: none; /* 기본 드롭다운 화살표 제거 */

  /* 드롭다운 화살표 추가 */
  background-image: url('/src/assets/Dropdown Arrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 25px;

  & option {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.text.white};
    color: ${({ theme }) => theme.colors.text.black};
  }
`