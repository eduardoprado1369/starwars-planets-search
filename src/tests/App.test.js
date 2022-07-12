import React from 'react';
import { getByDisplayValue, render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: async () => testData,
      })
      render(<App />);
  })
  it('Testa o filtro de nome', () => {
  const filter = screen.getByLabelText(/filtro/i)
  const searchButton = screen.getByRole('button', { name: /pesquisar/i})
  const table = screen.getByRole('table')
  const tatooine = screen.getByText(/tatooine/i)
  const naboo = screen.getByText(/naboo/i)
  const alderaan = screen.getByText(/alderaan/i)

  expect(filter).toBeInTheDocument()
  expect(searchButton).toBeInTheDocument();
  expect(table).toBeInTheDocument()
  expect(fetch).toHaveBeenCalled()
  expect(fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/')

  userEvent.type(filter, 'oo')
  
  expect(tatooine).toBeInTheDocument()
  expect(naboo).toBeInTheDocument()
  expect(alderaan).not.toBeInTheDocument()
  })
    it('Testa filtro population', () => {
    const populationOption = screen.getByRole('option', { name:/population/i })
    const biggerThanOption = screen.getByRole('option', { name:/maior que/i })
    const valueFilter = screen.getByTestId('value-filter')
    const tatooine = screen.getByText(/tatooine/i)
    const naboo = screen.getByText(/naboo/i)
    const alderaan = screen.getByText(/alderaan/i)
    const filterButton = screen.getByRole('button', { name: /pesquisar/i})

    expect(populationOption).toBeInTheDocument()
    expect(biggerThanOption).toBeInTheDocument()
    expect(valueFilter).toBeInTheDocument()

    userEvent.click(populationOption)
    userEvent.click(biggerThanOption)
    userEvent.type(valueFilter, 1000000)
    userEvent.click(filterButton)

    expect(naboo).toBeInTheDocument()
    expect(alderaan).toBeInTheDocument()
    // expect(tatooine).not.toBeInTheDocument()
    expect(populationOption).not.toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: /apagar/i})
    const deleteAllButton = screen.getByRole('button', { name: /Remover todas as filtragens/i})
    expect(deleteButton).toBeInTheDocument()

    userEvent.click(deleteButton)

    expect(tatooine).toBeInTheDocument()

    const orbitalPeriodOption = screen.getByRole('option', { name:/orbital_period/i })
    const lessThanOption = screen.getByRole('option', { name:/menor que/i })

    expect(orbitalPeriodOption).toBeInTheDocument()

    userEvent.click(orbitalPeriodOption)
    userEvent.click(lessThanOption)
    userEvent.type(valueFilter, 1000)
    userEvent.click(filterButton)

    expect(tatooine).toBeInTheDocument()
    expect(orbitalPeriodOption).not.toBeInTheDocument()

    userEvent.click(deleteButton)

    const endoor = screen.getByText(/endor/i)

    const diameterOption = screen.getByRole('option', { name:/diameter/i })
    const equalToOption = screen.getByRole('option', { name:/igual a/i })

    userEvent.click(diameterOption)
    userEvent.click(equalToOption)
    userEvent.type(valueFilter, 4900)
    userEvent.click(filterButton)

    expect(endoor).toBeInTheDocument()
    expect(diameterOption).not.toBeInTheDocument()
  })
});
