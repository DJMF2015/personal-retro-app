import styled from 'styled-components';
import StyledButton from '../StyledButton';  
import RetroCard from '../RetroCard';
import Link from 'next/link';
export default function RetroList({ items }) { 
  return (

    <StyledListContainer>
      <Link href='/retros/retroform'>
        <StyledButton>
          Add an entry
        </StyledButton>
      </Link>
      <br/>
      <RetroContainer>
        {items.map((item, index) => (
          <RetroCard retro={item} key={index} />
        ))} 
      </RetroContainer>
 </StyledListContainer>
  )
}


const StyledListContainer = styled.div`
padding: 0% 10%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const RetroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
