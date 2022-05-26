import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DoggoBreedSearch from '~components/DoggoBreedSearch';

import { useBreeds } from '~hooks/breeds';

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
  text: {
    color: colors.text
  }
});

function Breeds({ navigation }: Props) {
  const { colors } = useTheme()
  const styles = React.useMemo(
    () => getStyles(colors),
    [colors]
  )

  const { breeds } = useBreeds()

  const onBreedSelected = (breed: string) => {
    navigation.push(AuthStack.Details, { breed })
  }

  return (
    <View style={styles.container}>
      <StatusBar />

      <Text style={{
        ...styles.text,
        paddingTop: 16,
        paddingBottom: 16
      }}>
        Please start typing to search for dog breeds
      </Text>
      <DoggoBreedSearch breeds={breeds || []} onBreedSelected={onBreedSelected} />
    </View>
  );
}

export default Breeds;
