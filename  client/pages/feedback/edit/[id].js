import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import StyledButton from '../../../components/StyledButton'
import Feedback from '../../../models/feedback'
import { connectToDatabase } from '../../../helpers/db-util'
import { useSession, getSession } from 'next-auth/client';;
import Navbar from '../../../components/Navbar';
import { mediaQueries } from '../../../components/mediaQueries'; 
import { signUpFormMC } from '../../../mc'
export default function EditRetros({ feedback }) {

    const [errs, setErrors] = useState({});
    const [session, loading] = useSession();
    const router = useRouter()

    const [form, setForm] = useState({
        email: session.user.email ? session.user.email : '',
        feedbackTitle: feedback.feedbackTitle,
        feedbackDate: feedback.feedbackDate,
        feedbackProvidedBy: feedback.feedbackProvidedBy,
        feedback: feedback.feedback,
        tags: feedback.tags
    }); 
    
    const updateRetro = async () => {
        const { id } = router.query
        try {
            const res = await fetch(`/api/feedback/${id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/feedback");
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
        if (!form.feedbackTitle) err.feedbackTitle = 'feedback is required'
        if (!form.feedbackDate) err.feedbackDate = 'feedback date is required'
        if (!form.feedbackProvidedBy) err.feedbackProvidedBy = 'Overall feeling is required'
        if (!form.feedback) err.feedback = 'Title is required'
        if (!form.tags) err.tags = 'Date is required'
        return err
    }


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

                        <StyledButton type='Update'>
                            {signUpFormMC.SaveRetroMC}
                            Update
                        </StyledButton>

                    </form>
                   

                </CardContainer>
            </Wrapper>
  
        </>

    )
}

export async function getServerSideProps({ params }) {
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

// const BackIcon = styled(ArrowBack)`
// height: 1em;
// margin-right: 0.3em;
// `;


// const BackLink = styled.div`
//   cursor: pointer;
//   margin: 2em 0; 
//   margin-bottom: 2em;
//   font-size: 1.5em;
// `;

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
border: 1px solid; `

