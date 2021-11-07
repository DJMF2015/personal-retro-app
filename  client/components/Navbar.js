import styled from 'styled-components';
import Logo from '../components/Logo';
import NavLinks from '../components/NavLinks';
import { useRouter } from 'next/router';  
const Navbar = () => {
  const router = useRouter();

  return (
  
    <NavbarContainer>
    
      <Logo /> 
      {router.pathname === '/' ? null : (
        <>
          <NavLinks />  
        </> 
      )} 
    </NavbarContainer>
  );
};


const NavbarContainer = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 3em;
  height: 9.5em;
`;

 
export default Navbar;
