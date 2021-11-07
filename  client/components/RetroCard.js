 
import styled from 'styled-components';
import { CalendarAlt } from '@styled-icons/boxicons-regular/CalendarAlt';
import { Pricetags } from '@styled-icons/ionicons-solid/Pricetags';
import { mediaQueries } from './mediaQueries';
import Link from 'next/link';
import useWatchMedia from '../helpers/useWatchMedia'; 

const RetroCard = ({ retro }) => {
  const date = new Date(retro.date)  
  const {isMobile } = useWatchMedia('(max-width: 450px)');
 

  return (
    <>
      {retro && (
        <Link href={`/retros/[id]`} as={`/retros/${retro._id}`}>
    
          <Wrapper>
            <CardContainer>
              <EntryDate />
              {!isMobile && <CardRetroDate>{date.toLocaleDateString('en-UK')}</CardRetroDate>}
              <CardDetails style={{ color: 'grey' }}>
                <RetroHeader>
                  <RetroTitle>{retro.title}</RetroTitle>
                  {isMobile && <CardRetroDate>{date.toLocaleDateString('en-UK')}</CardRetroDate>}
                </RetroHeader>
                <Overview>{retro.overview}</Overview>
                {!isMobile && (
                  <TagGroup>
                    <PriceTags />
                    {retro.tags.map((t, index) => (
                      <Tag key={index}>{t}</Tag>
                    ))}
                  </TagGroup>
                )}
              </CardDetails>
            </CardContainer>
            {isMobile && (
              <TagGroup>
                <PriceTags />
                {retro.tags.map((t, index) => (
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

export default RetroCard;

export async function getServerSideProps({ params }) {
  const retro = await Retros.findById(params.id).lean()
  retro._id = retro._id.toString()
  console.log(retro)
  if (!retro) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      retros: JSON.parse(JSON.stringify(retro)),
    }, // will be passed to the page component as props
  }
}


const RetroTitle = styled.h2`
  color: black;
  margin-top: 0;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  ${mediaQueries('sm')`
    max-width: 60%; 
`} 
`;

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
  ${CardContainer}  {
    cursor: pointer;
    &:hover,
    &:focus {
      box-shadow: 0 10px 20px -5px rgba(5, 5, 0, 0.75); 
    }
    ${mediaQueries('sm')`  
     height:20vh;
`}
      }
`

const CardDetails = styled.div`
  display: inline-block;
  justify-content: center;
  margin-left: 10rem;
  ${mediaQueries('sm')` 
  display: inline; 
  justify-content: center; 
   font-size:.9rem; 
   height: 20vh;
`}
`;

const RetroHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Overview = styled.h4`
  color: black;
  font-weight: 300;
  margin: 6px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  ${mediaQueries('sm')`
  margin: 0;
  font-weight: 400;
`}
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

const CardRetroDate = styled.div`
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
