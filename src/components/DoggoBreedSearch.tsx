import * as React from 'react';
import AutoComplete from 'react-native-autocomplete-input';

import DoggoBreedItem from './DoggoBreedItem';

import { filterBreeds } from '~utils/breeds';

type DoggoBreedSearchProps = {
  // List of breed information
  breeds: string[],
  // Event triggered once a breed is selected
  onBreedSelected: (breed: string) => void
}

function DoggoBreeds({ breeds, onBreedSelected }: DoggoBreedSearchProps) {
  const [query, setQuery] = React.useState('')

  return (
    <AutoComplete
      data={filterBreeds(query, breeds)}
      value={query}
      onChangeText={(text: string) => setQuery(text)}
      flatListProps={{
        keyExtractor: breed => breed,
        renderItem: ({ item }) => <DoggoBreedItem breed={item} onBreedSelected={onBreedSelected} />
      }}
    />
  )
}

export default DoggoBreeds
