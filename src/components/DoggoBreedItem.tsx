import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useBreedItem } from '~hooks/breeds';

type DoggoBreedItemProps = {
  breed: string,
  onBreedSelected: (breed: string) => void
}

const getStyles = (colors: Record<string, string>) => StyleSheet.create({
  breedItem: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.border
  },
  breedImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 8
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textTransform: 'capitalize'
  }
});

function DoggoBreedItem({ breed, onBreedSelected }: DoggoBreedItemProps) {
  const { colors } = useTheme()
  const styles = React.useMemo(
    () => getStyles(colors),
    [colors]
  )
  
  const { breedImage } = useBreedItem(breed)

  return (
    <TouchableOpacity style={styles.breedItem} onPress={() => onBreedSelected(breed)}>
      {/* Show a placeholder image background while loading */}
      <ImageBackground source={require('~assets/dog-placeholder.png')} resizeMode={'cover'}>
        <Image
          style={styles.breedImage}
          source={{ uri: breedImage }}
        />
      </ImageBackground>
      <Text style={styles.text}>{breed}</Text>
    </TouchableOpacity>
  )
}

export default DoggoBreedItem
