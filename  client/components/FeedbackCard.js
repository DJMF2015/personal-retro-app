import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CalendarAlt } from '@styled-icons/boxicons-regular/CalendarAlt';
import { Pricetags } from '@styled-icons/ionicons-solid/Pricetags';
import { mediaQueries } from './mediaQueries';
import Link from 'next/link';  
import Feedback from '../pages/feedback';
import useWatchMedia from '../helpers/useWatchMedia';
const FeedbackCard = ({ feedback }) => {
  const date = new Date(feedback.feedbackDate) 
   
  const {isMobile} = useWatchMedia('(max-width: 450px)');

  return (
    <>
      {feedback && (
        <Link href={`/feedback/[id]`} as={`/feedback/${feedback._id}`}>
   
          <Wrapper>
            <CardContainer>
              <EntryDate />
              {!isMobile && <CardFeedbackDate>{date.toLocaleDateString('en-UK')}</CardFeedbackDate>}
              <CardDetails style={{ color: 'grey' }}>
                
                <FeedbackTitle>{feedback.feedbackTitle}</FeedbackTitle>
             <FeedbackHeader>
                  <FeedbackTitle>{feedback.feedbackProvidedBy}</FeedbackTitle>
                  {isMobile && <CardFeedbackDate>{date.toLocaleDateString('en-UK')}</CardFeedbackDate>}
                </FeedbackHeader>
                <Overview>{feedback.feedback}</Overview>
                {!isMobile && (
                  <TagGroup>
                    <PriceTags />
                    {feedback.tags.map((t, index) => (
                      <Tag key={index}>{t}</Tag>
                    ))}
                  </TagGroup>
                )} 
              </CardDetails>
            </CardContainer>
            {isMobile && (
              <TagGroup>
                <PriceTags />
                {feedback.tags.map((t, index) => (
                  <Tag key={index}>{t}</Tag>
                ))}{' '}
              </TagGroup>
            )}
          </Wrapper>
        </Link>
      )}
    </>
  );
};

export default FeedbackCard;

export async function getServerSideProps({ params }) {
  const feedback = await Feedback.findById(params.id).lean()
  feedback._id = feedback._id.toString()
  if (!feedback) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      feedbacks: JSON.parse(JSON.stringify(feedback)),
    }, // will be passed to the page component as props
  }
}
 

const CardContainer = styled.div`
  position: relative;
  margin: 20px auto;
  padding: 20px;
  color: #ffff;
  background-color: ghostwhite;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 10px 10px 25px -16px rgba(0, 0, 0, 0.75);
  width: 55vw;
  max-height: 60vh; 
  border-radius: 20px;
  border: darkgrey solid;
`;

const Wrapper = styled.div`
  ${CardContainer} {
    cursor: pointer;
    &:hover,
    &:focus {
      box-shadow: 0 10px 20px -5px rgba(5, 5, 0, 0.75);
    }
  }
`;

const CardDetails = styled.div`
  display: inline-block;
  justify-content: center;
  margin-left: 10rem;
  ${mediaQueries('sm')`
  margin: 0;
  font-size:.7rem;
`}
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedbackTitle = styled.h2`
  color: black;
  margin-top: 0;
  font-weight: bold; 
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  ${mediaQueries('sm')`
    max-width: 60%;
`}
`;

const Overview = styled.h4`
  color: black;
  font-weight: 300;
  margin: 6px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const Tag = styled.span`
  font-size: 1rem;
  font-weight: 3rem;
  margin: 0 1em;
  color: black;
  margin: 5px;
`;

const PriceTags = styled(Pricetags)`
  color: black;
  max-width: 2rem;
  max-height: 1.5rem;
  transform: rotateY(180deg);
`;

const CardFeedbackDate = styled.div`
  font-size: .8rem;
  color: black;
  position: relative;
  padding: 1px 10px;
  margin: 12px 40px;
  top: 4rem;
  ${mediaQueries('sm')`
  font-size: .7rem;
  color: black;
  position: relative;
  padding: 0;
  margin: 0;
  top: 0;
`}
`;

const EntryDate = styled(CalendarAlt)`
  color: ${props => props.theme.colour.black};
  margin: 1rem;
  position: absolute;
  max-height: 8rem;
  max-width: 8rem;
  ${mediaQueries('sm')`
  display: none;
`}
`;
