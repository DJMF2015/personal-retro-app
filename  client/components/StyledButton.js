import styled from "styled-components"; 
import { mediaQueries } from './mediaQueries';
const StyledButton = ({...rest}) => {
	return <StyledBtn {...rest} />
}

export default StyledButton;

const StyledBtn = styled.button`
  background-color: ${props => props.theme.colour.red};
  border: none;
  cursor: pointer;
  border-radius: 0.3em;
  padding: 1em;
  font-size: 1em;
  align-items: right; 
  min-width: 7em;
  color: ${props => props.theme.colour.white};
 
`;