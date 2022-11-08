import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import renderWithContext from '../renderWithContext';
import { act } from 'react-dom/test-utils';
import PlanetProvider from '../context/PlanetProvider';

// analisando a cobertura da página '/'
describe(('Testando a Page ' / ' '), () => {
 it(('Testando se existe a logo'), () => {
  render(<App />)
  const logoIMG = screen.getByAltText('star-wars-logo');
  expect(logoIMG).toBeInTheDocument();
 })
})

describe('Testes sobre títutulos', () => {
  it('Testando a existencia de titulos', () => {
    render(
    <PlanetProvider>
      <App />
    </PlanetProvider>);

    const title = screen.getByText(/projeto star wars \- trybe/i)
    expect(title).toBeInTheDocument();

    const buttonFilter = screen.getByText(/filtrar/i)
    expect(buttonFilter).toBeInTheDocument();

    const filtertest = screen.getByTestId(/comparison-filter/i);
    expect(filtertest).toBeInTheDocument();

    const filterColum = screen.getByTestId(/column-filter/i);
    expect(filterColum).toBeInTheDocument();

    const buttonFilter2 = screen.getByTestId(/button-filter/i);
    expect(buttonFilter2).toBeInTheDocument();

    const name = screen.getByText(/nome:/i)
    expect(name).toBeInTheDocument();

    const columm = screen.getByText(/coluna:/i)
    expect(columm).toBeInTheDocument();

    const number = screen.getByText(/numero:/i)
    expect(number).toBeInTheDocument();

    const options = screen.getByText(/operador:/i)
    expect(options).toBeInTheDocument();

    const menorQue = screen.getByRole('combobox', {
      name: /operador:/i
    })
    expect(menorQue).toBeInTheDocument();
  });
});

