import { expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { ThemeConsumer, ThemeProvider } from 'styled-components';
import RetroFieldContainer from '../components/retros/RetroFieldContainer';
import RetroPlaceholder from '../components/retros/RetroPlaceholder';


describe('Retro Field Container', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(), // Deprecated
      removeEventListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const title = 'Test 1';
  const body = 'Lorem Ipsum Test 123';

  it('should render the retro field container with the correct title', () => {
    render(<RetroFieldContainer title={title} body={body} />);
    expect(screen.getByText(title));
  });
  it('should render the retro field container with the correct body', () => {
    render(<RetroFieldContainer title={title} body={body} />);
    expect(screen.getByText(title));
  });
});

describe("RetroPlaceholder component", () => {

  const theme = {
    colour: {
      red: 'red'
    }
  }

  const makeComponent = (theme) => {
    return (<ThemeProvider theme={theme}>
      <RetroPlaceholder />
    </ThemeProvider>)
  }

  it("Should display Placeholder widget", () => {
    const {getByText} = render(makeComponent(theme)) 
    expect(getByText('No contributions recorded yet.'))
  })
});
