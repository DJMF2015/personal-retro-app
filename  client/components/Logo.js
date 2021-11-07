import styled from 'styled-components';

import Image from 'next/image';
import { RetroCard } from './RetroCard';

//Image size 688x188
/**
 * Component for displaying the website logo
 */
const Logo = () => {
  return (
    <ImageContainer>
      <Image
        src='/static/expand-logo.png'
        alt='expand-logo'
        width={280}
        height={68}
      />
    </ImageContainer>
  );
 
};

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 12em;
`;

export default Logo;
