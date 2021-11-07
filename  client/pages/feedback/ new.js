import Form from "./form"
import { useSession, getSession } from 'next-auth/client';
const NewFeedback = (form) => {
    const [session, loading] = useSession();
    const feedbackForm = {
        email: session.user.email ? session.user.email : '',
        feedbackTitle: form.feedbackTitle,
        feedbackDate:  form.Date,
        feedbackProvidedBy:  form.feedbackProvidedBy,
        feedback: form.feedback,
        tags: form.tags,
    }
    return <Form feedbackForm={feedbackForm} />
}

export default NewFeedback