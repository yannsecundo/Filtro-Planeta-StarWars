import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import renderWithContext from '../renderWithContext';
import { act } from 'react-dom/test-utils';
import PlanetProvider from '../context/PlanetProvider';
import testData from '../../cypress/mocks/testData';

const ROW_ROLE_SELECTOR = 'row';
// const COLUMN_ROLE_SELECTOR = 'columnheader';
const INPUT_FILTER_NAME_SELECTOR = 'name-filter';
// const COLUMN_FILTER_SELECTOR = 'column-filter';
// const COMPARISON_FILTER_SELECTOR = 'comparison-filter';
// const VALUE_FILTER_SELECTOR = 'value-filter';
// const BUTTON_FILTER_SELECTOR = 'button-filter';
// const REMOVE_FILTER_SELECTOR = 'filter';
// const SORT_COLUMN_SELECTOR = 'column-sort';
// const SORT_ORDER_ASC_SELECTOR = 'column-sort-input-asc';
// const SORT_ORDER_DESC_SELECTOR = 'column-sort-input-desc';
// const SORT_APPLY_SELECTOR = 'column-sort-button';
// const PLANET_NAME_SELECTOR = 'planet-name';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
}


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

    const buttonFilter = screen.getByText(/filter/i)
    expect(buttonFilter).toBeInTheDocument();

    const filtertest = screen.getByTestId(/comparison-filter/i);
    expect(filtertest).toBeInTheDocument();

    const filterColum = screen.getByTestId(/column-filter/i);
    expect(filterColum).toBeInTheDocument();

    const buttonFilter2 = screen.getByTestId(/button-filter/i);
    expect(buttonFilter2).toBeInTheDocument();

    const name = screen.getByText(/Name/i)
    expect(name).toBeInTheDocument();
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
  expect(numberTest.value).toHaveValue(number);

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

describe('Testes de pesquisa', () => {
  beforeAll(mockFetch);
  it('testando o filtro por número', async () => {
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
    userEvent.selectOptions(collum1, ['orbital_period']);

    const operator2 = screen.getByTestId(/comparison-filter/i);
    userEvent.selectOptions(operator2, ['igual a']);

    const nuumber = 304;
    const numberTest = screen.getByTestId('value-filter');
    userEvent.type(numberTest, '304');
    expect(numberTest).toHaveValue(nuumber);

    const clickOnButton = screen.getByRole('button', { name: /filter/i });
    userEvent.click(clickOnButton);
    expect(await screen.findByRole('columnheader', { name: /Tatooine/i })).toBeInTheDocument();
   });
  it('Renderize o campo de texto para o filtro de nomes', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR)).toBeInTheDocument();
  });

  it('Filtre os planetas que possuem a letra "o" no nome', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'o' } });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });

  it('Filtre planetas que possuem a letra "oo" no nome', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'oo' } });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
    const planetNames = ['Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });

  it('Faça vários filtros em sequência', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'o' } });
    let planetNames = [];
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
    planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }

    await act(async () => {
      const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      fireEvent.change(input, { target: { value: 'oo' } });
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
    planetNames = ['Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }

    await act(async () => {
      const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      fireEvent.change(input, { target: { value: '' } });
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
    planetNames = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });
});


