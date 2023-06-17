import React from 'react';
import Card from './Card';

import {render} from '@testing-library/react-native';

describe('Card component', () => {
  it('renders correctly', () => {
    const pokemon = [
      {id: '1', name: 'Pikachu', types: [{type: {name: 'electric'}}]},
    ];

    const {getByText, getByA11yLabel} = render(<Card pokemon={pokemon} />);

    expect(getByA11yLabel('Pokemon Card List')).toBeDefined();
    expect(getByText('Pikachu')).toBeDefined();
    expect(getByText('01')).toBeDefined();
  });

  it('calls fetchDescription and navigation.navigate on button press', () => {
    const pokemon = [
      {id: '1', name: 'Pikachu', types: [{type: {name: 'electric'}}]},
    ];

    const mockFetchDescription = jest.fn();
    const mockNavigate = jest.fn();

    useNavigation.mockReturnValue({navigate: mockNavigate});
    const PokemonContextConsumer = PokemonContext.Consumer;

    const {getByA11yLabel} = render(
      <PokemonContextConsumer>
        {({fetchDescription}) => (
          <Card pokemon={pokemon} fetchDescription={fetchDescription} />
        )}
      </PokemonContextConsumer>,
    );

    fireEvent.press(getByA11yLabel('Pokemon Card List'));

    expect(mockFetchDescription).toHaveBeenCalledWith('1');
    expect(mockNavigate).toHaveBeenCalledWith('Pokemon Details', {
      item: {id: '1', name: 'Pikachu', types: [{type: {name: 'electric'}}]},
    });
  });
});
