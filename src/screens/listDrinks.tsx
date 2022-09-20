import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../App';
import BackButton from '../components/backButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ListDrinks', 'Stack'>;

const ListDrinks = ({route, navigation}: Props) => {
  const {drinks} = route.params;

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      {drinks.length === 0 ? (
        <Text>No drinks found</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <BackButton color="black" onPress={() => navigation.goBack()} />
              <Text style={styles.title}>DRINKS</Text>
            </>
          }
          ListHeaderComponentStyle={styles.listHeader}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.push('DrinkDetail', {drink: item})}
                style={styles.containerImage}>
                <Image
                  resizeMode="stretch"
                  source={{uri: item.strDrinkThumb}}
                  style={styles.image}
                />
                <Text>{item.strDrink}</Text>
              </TouchableOpacity>
            );
          }}
          data={drinks}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginBottom: 10,
  },
  backgroundStyle: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  containerImage: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ListDrinks;
