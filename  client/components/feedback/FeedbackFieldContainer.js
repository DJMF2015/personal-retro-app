import { ChevronDown } from '@styled-icons/boxicons-solid';
import { useEffect, useState } from 'react';
import styled from 'styled-components'; 
const FeedbackFieldContainer = ({  title, body }) => {

  const [open, setOpen] = useState(isMobile ? false : true);
  const [isMobile, setIsMobile] = useState(undefined);

  const watchMedia = x => {
    if (x.matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setOpen(true);
    }
  };

  useEffect(() => {
    let media = window.matchMedia('(max-width: 450px)');
    watchMedia(media);
    media.addEventListener('change', watchMedia);
  }, []);

  
  return (
    <ExpandableContainer>
      <StyledTitle
        onClick={() => {
          if (!isMobile) return;
          setOpen(!open);
        }}
      >
        {title} 
        
        {isMobile && <ArrowDown open={open} />}
      </StyledTitle>
      <StyledContent open={open}>{body}</StyledContent>
    </ExpandableContainer>
  );
};
export default FeedbackFieldContainer;

const ExpandableContainer = styled.div`
  @media (max-width: 450px) {
    border: solid 2px lightgray;
    margin: 0.8em 0;
    border-radius: 18px;
    padding: 0.2em 1em;
  }
  transition: 0.4s;
`;

const StyledTitle = styled.h2`
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 1.4em;
  font-weight: 700;
  display: flex;
  justify-content: space-between;

  @media (max-width: 450px) {
    cursor: pointer;
    margin: 0.4em 0em;
    font-size: 1.1em;
  }
`;

const StyledContent = styled.p`
  display: ${({ open }) => (open ? 'block' : 'none')};
  margin-top: 0.5em;
  transition: none;
`;

const ArrowDown = styled(ChevronDown)`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.4s;
  height: 1em;
`;
