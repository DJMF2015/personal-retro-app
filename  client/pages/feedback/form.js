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

const FeedbackForm = () => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [session, loading] = useSession();
    const [form, setForm] = useState({
        email: session.user.email ? session.user.email : '',
        feedbackTitle: '',
        feedbackDate: '',
        feedbackProvidedBy: '',
        feedback: '',
        tags:  ''
    })

    const postData = async (form) => {
        try {
            const response = await fetch(`/api/feedback`, {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType
                },
                body: JSON.stringify(form)
            })

            if (!response.ok) {
                throw new Error(response.status)
            }

            router.push('/feedback')
        } catch (error) {
            setMessage('Failed to add Feedback entry')
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

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const errs = formValidation()
        if (Object.keys(errs).length === 0) { 
           postData(form)  
        } else {
            setErrors({ errs })
        }
    }

    /* Makes sure feedback info is filled for pet name, owner name, species, and image url*/
    const formValidation = () => {
        let err = {}
        if (!form.feedbackTitle) err.feedbackTitle = 'Title is required'
        if (!form.feedbackDate) err.feedbackDate = 'Date is required'
        if (!form.feedbackProvidedBy) err.feedbackProvidedBy = 'contributor is required'
        if (!form.feedback) err.feedback = 'feedback is required'
        return err
    }

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
           < MessageWarning>
            <p>{message}</p>
            
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>     
            </MessageWarning>
            <Wrapper>
                <CardContainer>
                    <form onSubmit={handleSubmit}>

                        <Label>Title</Label>
                        <FieldContainer>
                            <Title
                                type="text"
                                maxLength="100"
                                name="feedbackTitle"
                                value={form.feedbackTitle}
                                onChange={handleChange}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Date
                                type="date"
                                name="feedbackDate"
                                value={form.feedbackDate}
                                onChange={handleChange} 
                                required
                            />
                        </FieldContainer>
                        <Label>Feedback provided by:</Label>
                        <FieldContainer>
                            <Overview
                                type="text"
                                maxLength="100"
                                name="feedbackProvidedBy"
                                value={form.feedbackProvidedBy}
                                onChange={handleChange}
                                required
                            />
                        </FieldContainer>
                        <Label>Feedback</Label>
                        <FieldContainer>
                            <StyleInputWidget
                                type="text "
                                name="feedback"
                                value={form.feedback}
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

                        <StyledButton type='submit'>
                            {signUpFormMC.SaveRetroMC}
                            Save
                        </StyledButton>

                    </form>
                    <Link href={`/feedback/`}>
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
                </div>
                }
            
        </>

    )
}

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

const MessageWarning = styled.div`
text-align: center;
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

export default FeedbackForm