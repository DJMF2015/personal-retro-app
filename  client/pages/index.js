import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ToggleLoginRegister from '../components/ToggleLoginRegister';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router'; 

/**
 * Page Component for the Login/Sign up Page
 * @returns Logo, Sign Up and Login forms, and a button to switch between the forms.
 */
function Login() {
  const [session, loading] = useSession();

  const router = useRouter();

  if (session) router.replace('/retros'); 
 

  return (
    <>
      <Navbar />
      <StyledContainerDiv>
        <ToggleLoginRegister />
      </StyledContainerDiv>
     
    </>
  );
}


export default Login;

const StyledContainerDiv = styled.div`
  flex-direction: column;
  padding-top: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
