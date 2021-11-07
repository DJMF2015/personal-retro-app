import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import RetroCard from '../components/RetroCard';

// test retro card component object with existing data

// test if retro card component renders

describe('Rendering retro component', () => {
  const retro = {
    title: 'Retro 1. It has survived not only five centuries.',
    date: '25 May',
    overview: 'It has survived not only five centuries,',
    tags: ['Happy'],
  };

  const theme = {
    colour: {
      black: 'hsl(0, 0%, 0%)',
    },
  };

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

  const renderComponent = ({ theme, retro }) =>
    render(
      <ThemeProvider theme={theme}>
        <RetroCard retro={retro} />
      </ThemeProvider>
    );

  it('renders retro card with correct title', () => {
    const { getByText } = renderComponent({
      theme: theme,
      retro: retro,
    });

    expect(getByText(retro.title));
  });

  it('renders retro card with correct dates', () => {
    const { getByText } = renderComponent({
      theme: theme,
      retro: retro,
    });

    expect(getByText(retro.date));
  });

  it('renders retro card with correct overview', () => {
    const { getByText } = renderComponent({
      theme: theme,
      retro: retro,
    });

    expect(getByText(retro.overview));
  });

  it('renders retro card with correct tag', () => {
    const { getByText } = renderComponent({
      theme: theme,
      retro: retro,
    });

    expect(getByText(retro.tags[0]));
  });
});
