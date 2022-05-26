import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { useBreedDetails } from '~hooks/breeds';

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

function Details({ route }: any) {
  const { colors } = useTheme()
  const styles = React.useMemo(
    () => getStyles(colors),
    [colors]
  )
  const [galleryWidth, setGalleryWidth] = React.useState(0)
  const { pagination, setPagination, isLastPage, gotoNextPage, gotoPrevPage, loadingBreedImages, breedImages } = useBreedDetails(route.params.breed)

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
        {(breedImages || []).slice(pagination.current * pagination.itemsPerPage, (pagination.current + 1) * pagination.itemsPerPage).map((image) => (
          <Image style={{...styles.galleryImage, width: galleryWidth / 3, height: galleryWidth / 3}} source={{uri: image}} key={image} />
        ))}
      </View>
    </View>
  );
}

export default Details;
