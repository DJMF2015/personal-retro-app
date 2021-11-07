import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router' 
import Navbar from '../../components/Navbar';
import { Edit, Trash } from '@styled-icons/boxicons-solid';
import { Pricetags } from '@styled-icons/ionicons-solid/Pricetags';
import Link from 'next/link';
import { ArrowBack } from '@styled-icons/boxicons-regular';  
import Retros from '../../models/retros'
import RetroFieldContainer from '../../components/retros/RetroFieldContainer';
import { connectToDatabase } from '../../helpers/db-util' 

export default function Retro({ retro }) {
  const router = useRouter()
  const date = new Date(retro.date) 
  const [isMobile] = useState(undefined);

  const handleDelete = async () => {
    const retroID = router.query.id
    try {
      await fetch(`/api/retros/${retroID}`, {
        method: 'DELETE',
      })
      router.push('/retros')
      console.log(`successfully deleted retro , ${retro._id}`)
    } catch (error) {
      setMessage(`Failed to delete retro, ${retro._id}`)
    }
  } 
const UpdateRetro = () =>{ 
  router.push(`/retros/edit/${retro._id}`)
}

  return (

    <div key={retro._id}>
      <Navbar />   
      <>
      {retro && ( 
     
        <RetroContainer> 
          <HeaderContainer>
            <StyledTitle>{retro.title}</StyledTitle>
            <div>
              <EditIcon onClick={UpdateRetro}/>  
              <TrashIcon onClick={handleDelete} />  
            </div>
          </HeaderContainer>
          
          <StyledSubTitle>{date.toLocaleDateString('en-UK')}</StyledSubTitle>
          <RetroFieldContainer title="Overview" body={retro.overview} isMobile={isMobile}/>
          <RetroFieldContainer title="Technical Contributions" body={retro.technicalContributions} isMobile={isMobile}/>
          <RetroFieldContainer title="Team Contributions" body={retro.teamContributions} isMobile={isMobile}/>
          <RetroFieldContainer title="Wider Contributions" body={retro.widerContributions} isMobile={isMobile}/>
          <RetroFieldContainer title="Improvements AND Reflections" body={retro.improvementAndReflections} isMobile={isMobile}/>
      
          <StyledSubTitle>
            <PriceTagElement />
            Tags:{' '}
            {retro.tags.map(t => (
              <TagSpan>{t}</TagSpan>
            ))}
          </StyledSubTitle> 
       
          <Link href={`/retros/`}>
            <BackLink>
              <BackIcon />
              Back
            </BackLink>
          </Link> 
        </RetroContainer>
      )}
      </>
    </div>
   
  );
}

export async function getServerSideProps({params}) {
  const client = await connectToDatabase({
    database: process.env.EXPAND_DB,
  });
  const retro = await Retros.findById(params.id).lean()
  retro._id = retro._id.toString()
  if (!retro) {
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
      retro: JSON.parse(JSON.stringify(retro)),
    }, // will be passed to the page component as props
  }
}
 

const PriceTagElement = styled(Pricetags)`
  height: 1em;
  margin-right: 0.5em;
`;

const RetroContainer = styled.div`
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
