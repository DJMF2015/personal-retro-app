import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MobileNavLinks from './MobileNavLinks'
import { Navigation } from '@styled-icons/fluentui-system-filled/Navigation'
import { Cross } from '@styled-icons/icomoon/Cross'
import HamburgerStyles from '../styles/HamburgerMenu.module.css'

const MobileNav = ({ links }) => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <>
            <HamburgerMenu
                onClick={() => {
                    if (!navbarOpen) return;
                    setNavbarOpen(!navbarOpen);
                }}
                onClick={handleToggle}>{navbarOpen ?
                    <MobileNavLinks_UL >
                        <MobileNavLinks links={links} />
                    </MobileNavLinks_UL> :
                    <HamburgerIcon />}
            </HamburgerMenu >
        </>
    )

}


const HamburgerIcon = styled(Navigation)`
position: fixed; 
max-height: 2rem;
max-width: 2rem;
right: 3rem; 
top: 2em; 
color:black; 
`

const HamburgerMenu = styled.div`
color:black; 
height: 100vh;
max-width: 400px;
margin-left:6.5rem;
position: fixed;  
background-color: ${(props) => (props.clicked ? "transparent" : "white")};
left: 10px;
top: 0px;   
z-index: 1;   
 
 `

const MobileNavLinks_UL = styled.div` 
float:left;
 padding: 0; 
 list-style-type: none;
 font-size: .7em;
 color: ${props => props.theme.colour.red}; 
a  {
    &:hover,
    &:focus {
   text-decoration: underline;
   color:red;
 }

 }
`;

export default MobileNav;

