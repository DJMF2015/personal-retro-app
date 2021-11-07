import styled from 'styled-components';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav'; 
import { useEffect, useState } from 'react';

const NavLinks = () => {
  const [isMobileNav, setIsMobileNav] = useState(undefined); 

  const links = [
    {
      href: '/retros',
      text: 'Retros',
    },
    {
      href: '/feedback',
      text: 'Feedback',
    },
    {
      href: '/notepad',
      text: 'Notepad',
    },
  ];

  const watchMedia = x => {
    if (x.matches) {
      setIsMobileNav(true);
    } else {
      setIsMobileNav(false);
    }
  };

  useEffect(() => {
    let media = window.matchMedia('(max-width: 450px)');
    watchMedia(media);
    media.addEventListener('change', watchMedia);
  }, []);

  return (
    <>
    <NavContainer >
      {!isMobileNav && <DesktopNav links={links} />}
    
      {isMobileNav && <MobileNav links={links} /> }
       </NavContainer> 
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
 &:hover   {
  color:red;
 }
`;


export default NavLinks;