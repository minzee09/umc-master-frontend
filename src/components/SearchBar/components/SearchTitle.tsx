/* eslint-disable react/prop-types */
import Typography from '@components/common/typography';
import styled from 'styled-components';

interface SearchTitleProps {
  highlight?: string;
  frontText?: string;
  backText?: string;
}

const SearchTitle: React.FC<SearchTitleProps> = ({ highlight, frontText, backText }) => {
  return (
    <StyledTypography variant="titleSmall">
      {frontText && <span>{frontText} </span>}
      {highlight && <Highlight>{highlight}</Highlight>}
      {backText && <span> {backText}</span>}
    </StyledTypography>
  );
};

export default SearchTitle;

const StyledTypography = styled(Typography)`
  margin-bottom: 32px;
  text-align: center;
`;

const Highlight = styled.span`
  color: rgba(4, 112, 214, 1);
  font-weight: bold;
`;
