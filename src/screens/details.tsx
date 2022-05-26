import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useBreedDetails } from '~hooks/breeds';

import { AuthNavigatorParams } from '~types';
import { AuthStack } from '~consts/screens';

type Props = NativeStackScreenProps<AuthNavigatorParams, AuthStack.Details>

const getStyles = (colors: Record<string, string>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 8
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 16,
    paddingBottom: 16
  },
  pagination: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    height: 40
  },
  gallery: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  galleryImage: {
    flex: 0
  }
});

function Details({ route }: Props) {
  const { colors } = useTheme()
  const styles = React.useMemo(
    () => getStyles(colors),
    [colors]
  )
  const [galleryWidth, setGalleryWidth] = React.useState(0)
  const { pagination, isLastPage, gotoNextPage, gotoPrevPage, breedImages } = useBreedDetails(route.params.breed)

  // Get imgaes on current page
  // UseMemo for pagination performance
  const imagesOnCurrentPage = React.useMemo(
    () => (breedImages || []).slice(pagination.current * pagination.itemsPerPage, (pagination.current + 1) * pagination.itemsPerPage),
    [breedImages, pagination.current, pagination.total]
  )

  return (
    <View style={styles.container}>
      <StatusBar />

      <Text style={styles.title}>
        {route.params.breed}
      </Text>

      <View style={styles.pagination}>
        <Button title="< Prev" disabled={pagination.current <= 0} onPress={() => gotoPrevPage()} />
        <Text>
          {pagination.current * pagination.itemsPerPage + 1} -
          {Math.min((pagination.current + 1) * pagination.itemsPerPage, pagination.total)} of {pagination.total} images
        </Text>
        <Button title="Next >" disabled={isLastPage()} onPress={() => gotoNextPage()} />
      </View>

      <View style={styles.gallery} onLayout={(event) => setGalleryWidth(event.nativeEvent.layout.width)}>
        {imagesOnCurrentPage.map((image) => (
          <Image style={{...styles.galleryImage, width: galleryWidth / 3, height: galleryWidth / 3}} source={{uri: image}} key={image} />
        ))}
      </View>
    </View>
  );
}

export default Details;
