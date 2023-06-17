import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import PokemonListComponent from './PokemonList';
jest.mock('../../components/organism/context/PokemonContext', () => ({
  PokemonContext: {
    Consumer: ({children}) =>
      children({
        getPokemon: jest.fn(),
        pokeData: [],
        setPokeData: jest.fn(),
        setFilteredPokemonList: jest.fn(),
        filteredPokemonList: [],
        handleCheckbox: jest.fn(),
        typeFilteredPokemons: [],
        typeSelected: {},
        setTypeSelected: jest.fn(),
      }),
  },
}));

describe('PokemonListComponent', () => {
  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<PokemonListComponent />);

    expect(getByText(APPLICATION_NAME)).toBeDefined();
    expect(getByText(POKEMON_DESCRIPTION)).toBeDefined();
    expect(getByPlaceholderText(SEARCH_PLACEHOLDER)).toBeDefined();
    expect(getByText(FILTER)).toBeDefined();
  });

  it('updates searchQuery and calls setFilteredPokemonList on text input change', () => {
    const {getByPlaceholderText} = render(<PokemonListComponent />);

    const searchInput = getByPlaceholderText(SEARCH_PLACEHOLDER);

    fireEvent.changeText(searchInput, 'Pikachu');

    // Expect the state of searchQuery to be updated
    expect(searchInput.props.value).toBe('Pikachu');

    // Expect setFilteredPokemonList to be called
    expect(setFilteredPokemonList).toHaveBeenCalledTimes(1);
    expect(setFilteredPokemonList).toHaveBeenCalledWith([]);
  });

  it('opens and closes the filter modal', () => {
    const {getByText, queryByText} = render(<PokemonListComponent />);

    fireEvent.press(getByText(FILTER));

    // Expect the filter modal to be visible
    expect(queryByText(FILTER)).toBeDefined();

    fireEvent.press(getByText(RESET));

    // Expect the filter modal to be closed
    expect(queryByText(FILTER)).toBeNull();
  });

  // Add more test cases as needed
});
