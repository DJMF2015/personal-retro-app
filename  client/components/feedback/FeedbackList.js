import styled from 'styled-components';
import StyledButton from '../StyledButton';  
import FeedbackCard from '../FeedbackCard';
import Link from 'next/link';
export default function FeedbackList({ items }) {

  return (

    <StyledListContainer>
     <Link href='/feedback/form'>
        <StyledButton>
          Add an entry
        </StyledButton>
      </Link>
      <br/>
      <FeedbackContainer> 
      {items.map((item, i) => (
          <FeedbackCard feedback={item} key={i} />
        ))} 
      </FeedbackContainer>
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

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
