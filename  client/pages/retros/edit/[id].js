
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import StyledButton from '../../../components/StyledButton'
import Retros from '../../../models/retros'
import { connectToDatabase } from '../../../helpers/db-util'
import { useSession, getSession } from 'next-auth/client';;
import Navbar from '../../../components/Navbar';

export default function EditRetros({ retro }) {

    const [errs, setErrors] = useState({});
    const [session, loading] = useSession();
    const router = useRouter()
    let date = new Date(retro.date)
    let dates = date.toLocaleDateString('en-UK') 
    console.log(dates)
    
    const [form, setForm] = useState({
        email: session.user.email ? session.user.email : '',
        title: retro.title,
        date: retro.date,
        overview: retro.overview,
        technicalContributions: retro.technicalContributions,
        widerContributions: retro.widerContributions,
        teamContributions: retro.teamContributions,
        improvementAndReflections: retro.improvementAndReflections,
        tags: retro.tags,
        overallFeeling: retro.overallFeeling
    }); 
    
    const updateRetro = async () => {
        const { id } = router.query
        try {
            const res = await fetch(`/api/retros/${id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/retros");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errs = formValidation();
        setErrors(errs);
        updateRetro();
    }

    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        setForm({
            ...form,
            [name]: target.value,
        })
    }

    const formValidation = () => {
        let err = {}
        if (!form.overview) err.overview = 'Overview is required'
        if (!form.technicalContributions) err.technicalContributions = 'technicalContributions is required'
        if (!form.overallFeeling) err.overallFeeling = 'Overall feeling is required'
        if (!form.title) err.name = 'Title is required'
        if (!form.date) err.date = 'Date is required'
        return err
    }
    return (
        <>
        <Navbar />
        <Wrapper>
            <CardContainer> 
                <div>
                    {
                        <form onSubmit={handleSubmit} >

                            <Label>Title</Label>
                            <FieldContainer>
                                <Title
                                    type="text"
                                    maxLength="50"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                /> 
                            </FieldContainer>  
                            <FieldContainer> 
                                   <DateBtn type="date"
                                    name="date"
                                    value={retro.dates}
                                    onChange={handleChange}
                                    defaultValue={retro.dates}
                                />  
                            </FieldContainer>
                            <Label>Overview</Label>
                            <FieldContainer>
                                <Overview
                                    type="text"
                                    maxLength="200"
                                    name="overview"
                                    value={form.overview}
                                    onChange={handleChange}
                                    required
                                />
                            </FieldContainer>
                            <Label>Technical Contributions</Label>
                            <FieldContainer>
                                <StyleInputWidget
                                    type="text "
                                    name="technicalContributions"
                                    value={form.technicalContributions}
                                    onChange={handleChange}
                                />
                            </FieldContainer>
                            <Label>Wider Contributions</Label>
                            <FieldContainer>
                                <StyleInputWidget
                                    type="textarea"
                                    name="widerContributions"
                                    value={form.widerContributions}
                                    onChange={handleChange}
                                />
                            </FieldContainer>

                            <Label>Team Contributions</Label>
                            <FieldContainer>
                                <StyleInputWidget
                                    type="text"
                                    name="teamContributions"
                                    value={form.teamContributions}
                                    onChange={handleChange}
                                />
                            </FieldContainer>
                            <Label>Improvements AND Reflections</Label>
                            <FieldContainer>
                                <StyleInputWidget
                                    type="textarea"
                                    name="improvementAndReflections"
                                    value={form.improvementAndReflections}
                                    onChange={handleChange}
                                />
                            </FieldContainer> 
                            <Label> Tags</Label>
                            <FieldContainer>
                                <Tags
                                    type="text"
                                    max='15'
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}

                                />
                            </FieldContainer>
                            <Label>How do you feel the weeks went overall?</Label>
                            <RadioBtnWrapper>

                                <FeelingsWrapper>
                                    <label>Unsatisfied</label>
                                    {form.overallFeeling === 'Unsatisfied' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Unsatisfied'}
                                        onChange={handleChange}
                                        checked={true}
                                        required
                                    />)}
                                    {form.overallFeeling !== 'Unsatisfied' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Unsatisfied'}
                                        onChange={handleChange}
                                        checked={false}
                                        required
                                    />)}

                                </FeelingsWrapper>
                                <FeelingsWrapper>
                                    <label>Satisfied</label>
                                    {form.overallFeeling === 'Satisfied' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Satisfied'}
                                        onChange={handleChange}
                                        checked={true}
                                        required
                                    />)}
                                    {form.overallFeeling !== 'Satisfied' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Satisfied'}
                                        onChange={handleChange}
                                        checked={false}
                                        required
                                    />)}
                                </FeelingsWrapper>
                                <FeelingsWrapper>
                                    <label>Neutral</label>
                                    {form.overallFeeling === 'Neutral' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Neutral'}
                                        onChange={handleChange}
                                        checked={true}
                                        required
                                    />)}
                                    {form.overallFeeling !== 'Neutral' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Neutral'}
                                        onChange={handleChange}
                                        checked={false}
                                        required
                                    />)}
                                </FeelingsWrapper>
                                <FeelingsWrapper>
                                    <label>Very Satisfied</label>
                                    {form.overallFeeling === 'Very Satisifed' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Very Satisfied'}
                                        onChange={handleChange}
                                        checked={true}
                                        required
                                    />)}
                                    {form.overallFeeling !== 'Very Satisifed' && (<OptionBtns
                                        type='radio'
                                        name="overallFeeling"
                                        value={'Very Satisifed'}
                                        onChange={handleChange}
                                        checked={false}
                                        required
                                    />)}
                                </FeelingsWrapper>
                                <StyledButton type='submit'>
                                    Update
                                </StyledButton>
                            </RadioBtnWrapper>
                        </form>
                    }
                </div>
            </CardContainer>
        </Wrapper>
        </>
    )
}
// 
export async function getServerSideProps({ params }) {
    const client = await connectToDatabase({
        database: process.env.EXPAND_DB,
    });
    const retro = await Retros.findById(params.id).lean()
    retro._id = retro._id.toString()
    console.log(retro)
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

const FieldContainer = styled.div`
 display: flex;
 align-items: center;
 margin: 0;
`;

const RadioBtnWrapper = styled.div`
display: flex;
justify-content: space-between; 
margin-top:2em;
`


const Overview = styled.input`
 border: 1px solid;
 margin-bottom: 10px;
 margin-top:1em;
 height: 2.5rem; 
 width: 100%;
 border-radius: 15px; 
 @media (max-width: 450px) {
   width: 19rem;
 }
`

const CardContainer = styled.div`
  position: relative;
  margin: 20px auto;
  padding: 20px;
  width: 60rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Wrapper = styled.div`
display:flex; 
flex-direction: column;
  ${CardContainer} {
    cursor: pointer;
    }
  
`;

const Label = styled.label`
 font-size: 20px; 
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Title = styled.input`
width: 30%;
margin-top:1em;
border: 1px solid;
margin-bottom: 10px;
height: 2.25rem;
overflow-y: visible;
border-radius: 15px;
@media (max-width: 450px) {
  width: 19rem;
}
`

const FeelingsWrapper = styled.div`
display: flex;
justify-content:center;
flex-direction: column;
align-items:center;
`

const OptionBtns = styled.input`
 border: 1px solid; 
 height: 2rem;
 width: 2em;   
 @media (max-width: 450px) {
   width: 19rem; 
 }
`;


const DateBtn = styled.input`
margin-left:35em;
position: absolute;
border: 1px solid;
border-radius: 10px;
margin-bottom: 4em;
height: 3em ;
width:25rem;
`
const StyleInputWidget = styled.textarea`
  width: 100%;
  margin-top:1em;
  border: 1px solid;
  margin-bottom: 10px;
  height: 7rem;
  overflow-y: visible;
  border-radius: 10px;
  @media (max-width: 450px) {
    width: 19rem;
  }
`

const Tags = styled.input`
height: 2rem; 
border-radius: 15px; 
width: 100%;
margin-top:1em;
margin-bottom:1em;
border: 1px solid; 
`

