import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router'; 

const DesktopNav = ({ links }) => {
  const router = useRouter();

  return (
    <>
      <NavUl>
        {links.map((li, index) => {
          const content =
            router.pathname === li.href ? <b>{li.text}</b> : li.text;
          return (
            <>
              <NavLi>
            
                <Link key={index} href={li.href}>{content}</Link>
              </NavLi>
              {index !== links.length - 1 && <LinkSeperator />}
            </>
          );
        })}
      </NavUl>
    </>
  );
};

const NavUl = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 5em auto 7em auto 6em;
  list-style-type: none;
  font-size: 1.6em;
   @media (max-width: 450px) {
    a{
       text-decoration: none;
       color: ${props => props.theme.colour.black};
       float:left;
       display:block;
       margin: 0;
       padding: 0;
     } 
   }
`;

const NavLi = styled.li`
  margin: auto;
  cursor: pointer;
  text-align: center;
  a {
    text-decoration: none;
    color: ${props => props.theme.colour.black};
  
  }
  @media (max-width: 450px) {
    a{
       text-decoration: none;
       color: ${props => props.theme.colour.black};
       float:left;
       display:block;
       margin: 0;
       padding: 0;
     } 
   }
`;

const LinkSeperator = styled.div`
  margin: auto;
  border-left: 1px solid ${props => props.theme.colour.black};
  height: 1.1em;

`;

export default DesktopNav;
