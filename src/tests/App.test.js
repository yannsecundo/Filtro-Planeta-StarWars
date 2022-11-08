import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import renderWithContext from '../renderWithContext';
import { act } from 'react-dom/test-utils';
import PlanetProvider from '../context/PlanetProvider';
import testData from '../../cypress/mocks/testData';

// analisando a cobertura da página '/'
describe(('Testando a Page ' / ' '), () => {
 it(('Testando se existe a logo'), () => {
  render(<App />)
  const logoIMG = screen.getByAltText('star-wars-logo');
  expect(logoIMG).toBeInTheDocument();
 })
})
// testando o básico
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
// aprendendo mocks meu deus eu to muito feliz socorro
describe('Testando os selects', () => {
it('Testando as colunas', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
   });
    await act( async () => {
      renderWithContext(
      <PlanetProvider>
        <App />
      </PlanetProvider>);
    })

  const collumInput = screen.getByTestId('column-filter');
  userEvent.selectOptions(collumInput, ['population']);
  await waitFor(() => expect(collumInput).toHaveValue('population'))

  const collumInput2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(collumInput2, ['surface_water']);
  await waitFor(() => expect(collumInput2).toHaveValue('surface_water'))

  const collumInput3 = screen.getByTestId('column-filter');
  userEvent.selectOptions(collumInput3, ['orbital_period']);
  await waitFor(() => expect(collumInput3).toHaveValue('orbital_period'))

  const collumInput4 = screen.getByTestId('column-filter');
  userEvent.selectOptions(collumInput4, ['diameter']);
  await waitFor(() => expect(collumInput4).toHaveValue('diameter'))

  const collumInput5 = screen.getByTestId('column-filter');
  userEvent.selectOptions(collumInput5, ['rotation_period']);
  await waitFor(() => expect(collumInput5).toHaveValue('rotation_period'))

  const operatorInput = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(operatorInput, ['igual a']);
  expect(operatorInput).toHaveValue('igual a');

  const operatorInputEqual = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(operatorInputEqual, ['maior que']);
  expect(operatorInputEqual).toHaveValue('maior que');

  const operatorInput2 = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(operatorInput2, ['menor que']);
  expect(operatorInput2).toHaveValue('menor que');

  const number = 233;
  const numberTest = screen.getByTestId('value-filter');
  userEvent.type(numberTest, '233');
  expect(numberTest).toHaveValue(number);

  const btnFilterr = screen.getByTestId('button-filter');
  await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(11))
  userEvent.click(btnFilterr); 

  const inputName = screen.getByRole('columnheader', {
    name: /bespin/i
  })
  expect(inputName).toBeDefined();

  const inputName2 = screen.getByRole('columnheader', {
    name: /dagobah/i
  })
  expect(inputName2).toBeDefined();

  const planet = screen.getByRole('columnheader', {
    name: /hoth/i
  })
  expect(planet).toBeDefined();

  const nameCollum = screen.getByRole('columnheader', {
    name: /name/i
  })
  expect(nameCollum).toBeDefined();
  })
})

describe('Testando os seletores individuais', () => {
  it('seletores', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
     });
      await act( async () => {
        renderWithContext(
        <PlanetProvider>
          <App />
        </PlanetProvider>);
      })

  expect(global.fetch).toHaveBeenCalled();
    const collum1 = screen.getByTestId(/column-filter/i);
    userEvent.selectOptions(collum1, ['diameter']);

    const operator2 = screen.getByTestId(/comparison-filter/i);
    userEvent.selectOptions(operator2, ['igual a']);

    const nuumber = 19720;
    const numberTest = screen.getByTestId('value-filter');
    userEvent.type(numberTest, '19720');
    expect(numberTest).toHaveValue(nuumber);

    const clickbutton = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(clickbutton);
    expect(await screen.findByRole('columnheader', { name: /kamino/i })).toBeInTheDocument();
   });
  });

