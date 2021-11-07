import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import { Edit, Trash } from '@styled-icons/boxicons-solid';
import { Pricetags } from '@styled-icons/ionicons-solid/Pricetags';
import Link from 'next/link';
import { ArrowBack } from '@styled-icons/boxicons-regular';  
import Feedback from '../../models/feedback'
import { connectToDatabase } from '../../helpers/db-util'
import FeedbackFieldContainer from '../../components/feedback/FeedbackFieldContainer';

export default function Retro({ feedback }) {
  const router = useRouter()
  const date = new Date(feedback.feedbackDate)
  const [isMobile] = useState(undefined)
  const handleDelete = async () => {
    const feedbackID = router.query.id
    try {
      await fetch(`/api/feedback/${feedbackID}`, {
        method: 'DELETE',
      })
      router.push('/feedback')
      console.log(`successfully deleted feedback , ${feedback._id}`)
    } catch (error) {
      setMessage(`Failed to delete feedback, ${feedback._id}`)
    }
  } 
const UpdateRetro = () =>{ 
  router.push(`/feedback/edit/${feedback._id}`)
}

  return (

    <div key={feedback._id}>
      <Navbar />  
      <>
      {feedback && ( 
      
      <FeedbackContainer> 
        <HeaderContainer>
          <StyledTitle>{feedback.feedbackTitle}</StyledTitle>
          <div>
            <EditIcon onClick={UpdateRetro}/>  
            <TrashIcon onClick={handleDelete} />  
          </div>
        </HeaderContainer>
    
        <StyledSubTitle>{date.toLocaleDateString('en-UK')}</StyledSubTitle>
        <StyledSubTitle>Feedback by:</StyledSubTitle>
        <p>{feedback.feedbackProvidedBy}</p>
          <FeedbackFieldContainer title="Feedback" body={feedback.feedback} isMobile={isMobile}/>
        <StyledSubTitle>
          <PriceTagElement />
          Tags:{' '}
          <TagSpan>
          <FeedbackFieldContainer  body={feedback.tags} isMobile={isMobile}/>
          </TagSpan>
        </StyledSubTitle> 
     
        <Link href={`/feedback/`}>
          <BackLink>
            <BackIcon />
            Back
          </BackLink>
        </Link> 
      </FeedbackContainer>
    )}
    </>
  </div>
 
);
}

export async function getServerSideProps({params}) {
  const client = await connectToDatabase({
    database: process.env.EXPAND_DB,
  });
  const feedback = await Feedback.findById(params.id).lean()
  feedback._id = feedback._id.toString()
  if (!feedback) {
    return {
      notFound: true,
      redirect: {
        destination: '/retros',
        permanent: false
      }
    }
  }
  client.connection.close()
  return {
    props: {
      feedback: JSON.parse(JSON.stringify(feedback)),
    }, // will be passed to the page component as props
  }
}
 

const PriceTagElement = styled(Pricetags)`
  height: 1em;
  margin-right: 0.5em;
`;

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 20%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.7em;
`;
const StyledSubTitle = styled.h2`
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 1.4em;
  font-weight: 700;
`;

const TagSpan = styled.span`
  font-weight: 500;
  font-size: 1em;
  margin: 0 0.5em;
`;

const EditIcon = styled(Edit)`
  height: 2em;
  cursor: pointer;
`;

const TrashIcon = styled(Trash)`
  height: 2em;
  cursor: pointer;
`;

const BackIcon = styled(ArrowBack)`
  height: 1em;
  margin-right: 0.3em;
`;

const BackLink = styled.div`
  cursor: pointer;
  margin: 2em 0;
  display: flex;
  align-items: center;
  font-size: 1.5em;
`;
