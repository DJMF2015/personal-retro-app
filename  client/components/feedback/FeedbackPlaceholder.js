import styled from 'styled-components';
import StyledButton from '../StyledButton';
import Link from 'next/link';

export default function renderFeedbackPlaceholder() {
  return (
    <StyledRetroContainer>
      <h2>No contributions recorded yet.</h2>
      <Link href='/feedback/form'>
        <StyledButton>
          Add an entry
        </StyledButton>
      </Link>
      
    </StyledRetroContainer>
  );
}

const StyledRetroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
