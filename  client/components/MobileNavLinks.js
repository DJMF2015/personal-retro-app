import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Cross } from '@styled-icons/entypo/Cross'   
import { SignOut } from '@styled-icons/octicons';
import { signOut } from 'next-auth/client';

const MobileNavLinks = ({ links }) => {

  const router = useRouter();
  return (

    <>
      <NavCross />
      <NavUl>
        {links.map((li, index) => {
          const content =
            router.pathname === li.href ? <b>{li.text}</b> : li.text;
          return (
            <>
              <NavLi>
                <Link key={li.id} href={li.href}>{content}</Link>

              </NavLi>

            </>
          );
        })}
      </NavUl>
      <StyledBtn onClick={ signOut}>
        <SignOutButton />
      </StyledBtn>
    </>
  );

};

const NavCross = styled(Cross)`
position: fixed; 
top: 1em;
max-height: 3rem;
max-width: 3rem;
margin-left: 1em;
color:black; 
`

const NavUl = styled.ul`
  margin: 10px;
  padding: 0;
  list-style-type: none;
  font-size: 1.6em; 
  margin-top: 75px;
`;

const NavLi = styled.li`
  margin: auto;
  padding: 35px 25px 0px   ; 
  text-align: left;
   margin-right: 100px;
   font-weight: 300;
   font-size: 23px;
   font-style: normal;
   font-family:  Verdana, Geneva;
   
  a  {
    text-decoration: none;
    color: ${props => props.theme.colour.black};
    display:block;
    margin-right: 100px; 
    font-size: 23px;
     font-weight: 300;
     font-style: normal;
     font-family: Verdana, Geneva ; 
  }  
`;

const SignOutButton = styled(SignOut)`
  height: 2em;
  width: 100%;
`;

const StyledBtn = styled.button`
  background-color: ${props => props.theme.colour.red};
  border: none;
  margin: 300px 100px  ;
  cursor: pointer;
  border-radius: 0.5em;
  padding: 1em;
  font-size: 1em;
  min-width: 8em;
  color: ${props => props.theme.colour.white};
  `
export default MobileNavLinks;
