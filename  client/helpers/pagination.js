import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { ArrowLeft } from '@styled-icons/bootstrap/ArrowLeft'

const Pagination = ({ onPageChange, totalCount, totalNoOfPages, currentPage}) => {

  // previous pagination
  const handleBackArrow = () => {
    if (currentPage === 1) {
      return onPageChange(1)
    }
    onPageChange((pageNumber) => Math.min(pageNumber - 1, totalNoOfPages));

  }

  // next pagination
  const handleNextArrow = () => {
    if (onPageChange === totalNoOfPages) {
      return totalNoOfPages
    }
    onPageChange((pageNumber) => Math.min(pageNumber + 1, totalNoOfPages));
  };

  return (
    <>
      <Wrapper>
        {<ArrowIconBack style={{
          height: '65px',
          width: '85px'
        }} onClick={handleBackArrow}></ArrowIconBack>}

        {<ArrowIconRight style={{
          height: '65px',
          width: '85px'
        }} onClick={handleNextArrow}></ArrowIconRight>}
      </Wrapper>
    </>
  );
};
const ArrowIconRight = styled(ArrowRight)` 
  color: black; 
  margin-left: 75vw; 
  margin-top: -5em;
  margin-bottom: 2rem;
`;
const ArrowIconBack = styled(ArrowLeft)` 
  color: black; 
  margin-left:15vw;  
  margin-bottom:1rem;
`;

const Wrapper = styled.div`
${ArrowIconRight} ,${ArrowIconBack} {
  &:hover,
  &:focus {
    box-shadow: 0 10px 20px -5px rgba(0.7, 1, 1, 0.35);
    border-radius: 100px;
    background-color: ghostwhite;
  }
}
`;
export default Pagination;
