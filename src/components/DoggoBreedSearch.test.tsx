import React from 'react';
import renderer from 'react-test-renderer';

import DoggoBreedSearch from './DoggoBreedSearch'

const breeds = ['African', 'Corgi', 'Retriever']

describe('<DoggoBreedSearch />', () => {
  it('It should have an Input Box', () => {
    const onBreedSelected = () => {}

    const searchBox = renderer.create(
      <DoggoBreedSearch breeds={breeds} onBreedSelected={onBreedSelected} />
    );
    const searchBoxInst = searchBox.root;

    const inputBox = searchBoxInst.find((node) => node.type.toString() === 'TextInput')
    expect(inputBox).toBeTruthy()
  })
})
