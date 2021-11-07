import styled from 'styled-components';
import StyledButton from '../../components/StyledButton'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signUpFormMC } from '../../mc'
import { ArrowUpCircleFill } from '@styled-icons/bootstrap/ArrowUpCircleFill'
import { ArrowBack } from '@styled-icons/boxicons-regular';
import { useSession, getSession } from 'next-auth/client';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { mediaQueries } from '../../components/mediaQueries'; 

const RetroForm = () => {
    const router = useRouter()
    const [session, loading] = useSession();
    const [errors, setErrors] = useState({})
    const [isMobile, setIsMobile] = useState(undefined);
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({
        email: session.user.email ? session.user.email : '',
        title: '',
        date: ' ',
        overview: '',
        technicalContributions: ' ',
        widerContributions: '',
        teamContributions: ' ',
        improvementAndReflections: ' ',
        tags: '',
        overallFeeling: ''
    })
    const handleSubmit = async event => {
        event.preventDefault();
        const errs = formValidation()
        if (Object.keys(errs).length === 0) {
            addRetro(form)
        } else {
            setErrors({ errs })
        }
    }

    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        setForm({
            ...form,
            [name]: target.value,
        })
    }

    /* Makes sure retro info is filled for retro title, date...*/
    const formValidation = () => {
        let err = {}
        if (!form.title) err.name = 'Title is required'
        if (!form.date) err.date = 'Date is required'
        if (!form.overview) err.overview = 'Overview is required'
        return err
    }

    const addRetro = async (form) => {
        try {
            const res = await fetch('/api/retros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }
            router.push('/retros')
        } catch (errors) {
            console.log(errors)
        }
    }

    const watchMedia = x => {
        if (x.matches) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        let media = window.matchMedia('(max-width: 450px)');
        watchMedia(media);
        media.addEventListener('change', watchMedia);
    }, []);

    // Show button when  scroll up to set distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set top coordinate to 0
    // for smooth scrolling 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            <Navbar />
            <Wrapper>
                <CardContainer>
                    <form onSubmit={handleSubmit}>

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
                            <Date
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
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
                                <OptionBtns
                                    type='radio'
                                    name="overallFeeling"
                                    value={'Unsatisfied'}
                                    onChange={handleChange}
                                    required
                                />
                            </FeelingsWrapper>
                            <FeelingsWrapper>
                                <label>Very Unsatisfied</label>
                                <OptionBtns
                                    type='radio'
                                    name="overallFeeling"
                                    value={'Very Unsatisfied'}
                                    onChange={handleChange}
                                    required
                                />
                            </FeelingsWrapper>
                            <FeelingsWrapper>
                                <label>Neutral</label>
                                <OptionBtns
                                    type='radio'
                                    name="overallFeeling"
                                    value={'Neutral'}
                                    onChange={handleChange}
                                />
                            </FeelingsWrapper>
                            <FeelingsWrapper>
                                <label>Satisfied</label>
                                <OptionBtns
                                    type='radio'
                                    name="overallFeeling"
                                    value={'Satisfied'}
                                    required
                                    onChange={handleChange}
                                />
                            </FeelingsWrapper>
                            <FeelingsWrapper>
                                <label>Very Satisfied</label>
                                <OptionBtns
                                    type='radio'
                                    name="overallFeeling"
                                    value={'Very Satisfied'}
                                    required
                                    onChange={handleChange} />
                            </FeelingsWrapper>
                            <StyledButton type='submit'>
                                {signUpFormMC.SaveRetroMC}
                                Save
                            </StyledButton>
                        </RadioBtnWrapper>
                    </form>
                    <Link href={`/retros/`}>
                        <BackLink>
                            <BackIcon />
                            Return
                        </BackLink>
                    </Link>

                </CardContainer>
            </Wrapper>

            {isVisible &&
                <div onClick={scrollToTop}>
                    <ScrollToTop alt='Go to top'>
                    </ScrollToTop>
                </div>}
        </>

    )
}

export default RetroForm

/**
* Styling for Login form component elements - Form fields
*/
const FieldContainer = styled.div`
 display: flex;
 align-items: center;
 margin: 0;
 ${mediaQueries('sm')`
  margin: 0;
  font-weight: 400;
`}
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

`

const BackIcon = styled(ArrowBack)`
  height: 1em; 
  margin-right: 0.3em;
`;

const BackLink = styled.div`
  cursor: pointer;
  margin: 2em 0; 
  margin-bottom: 2em;
  font-size: 1.5em;
`;

const ScrollToTop = styled(ArrowUpCircleFill)`
height:3em;  
position: absolute;
margin-top:-9rem; 
margin-left: 73em;
`


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


const Date = styled.input`
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