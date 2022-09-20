import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import BackButton from '../components/backButton';
import {DetailedDrink} from '../models/drink';
import api from '../services/api';
import {isFavoriteStorage, setFavorite} from '../services/storage';

interface ApiResponse {
  drinks: DetailedDrink[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'DrinkDetail', 'Stack'>;

const DrinkDetail = ({route, navigation}: Props) => {
  const {drink} = route.params;
  const [detailedDrink, setDetailedDrink] = useState<DetailedDrink>();
  const [listIngredients, setListIngredients] = useState<String[]>();
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      i: `${drink.idDrink}`,
    });

    const endponit = 'lookup.php?' + searchParams;
    api<ApiResponse>(endponit, {method: 'GET'})
      .then(res => {
        if (res.drinks.length === 0) {
          Alert.alert('Error', 'Unavailable service');
          setIsLoading(false);
          return;
        }

        const apiDrink = res.drinks[0];

        setDetailedDrink(apiDrink);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('e :>> ', e);
        setIsLoading(false);
      });
  }, [drink.idDrink]);

  useEffect(() => {
    if (!detailedDrink) {
      return;
    }

    const ingredients = Object.entries(detailedDrink).filter(
      ([key, value]) => key.includes('strIngredient') && value,
    );

    setListIngredients(ingredients.map(item => item[1]));

    isFavoriteStorage(detailedDrink.idDrink).then(value => {
      setIsFavorite(value);
    });
  }, [detailedDrink]);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      {isLoading && (
        <ActivityIndicator style={styles.loading} size="large" color="grey" />
      )}
      {detailedDrink && (
        <>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.backgroundStyle}>
            <View>
              <BackButton color="white" onPress={() => navigation.goBack()} />
              <Image
                resizeMode="stretch"
                source={{uri: detailedDrink?.strDrinkThumb}}
                style={styles.image}
              />
              <View style={styles.containerInfo}>
                <Text>Name: {detailedDrink?.strDrink}</Text>
                <Text>Glass: {detailedDrink?.strGlass}</Text>
                <Text>Instructions: {detailedDrink?.strInstructions}</Text>

                <Text style={styles.ingredients}>INGREDIENTS</Text>
                {listIngredients?.map((ingredient, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={async () => {
                        const searchParams = new URLSearchParams({
                          i: `${ingredient}`,
                        });
                        const endponit = 'filter.php?' + searchParams;

                        const {drinks} = await api<ApiResponse>(endponit, {
                          method: 'GET',
                        });

                        if (typeof drinks !== 'object') {
                          Alert.alert('Not found', 'No drink found');
                          return;
                        }

                        navigation.push('ListDrinks', {drinks});
                      }}>
                      <Text key={index}>{ingredient}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {isFavorite !== null && (
            <TouchableOpacity
              style={styles.containerButton}
              onPress={async () => {
                await setFavorite(detailedDrink.idDrink, !isFavorite);
                setIsFavorite(!isFavorite);
              }}>
              {isFavorite ? (
                <Text style={styles.textButton}>REMOVE FROM FAVORITES</Text>
              ) : (
                <Text style={styles.textButton}>ADD TO FAVORITES</Text>
              )}
            </TouchableOpacity>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  backgroundStyle: {
    flex: 1,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
    backgroundColor: 'green',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 350,
  },
  containerInfo: {
    padding: 10,
  },
  ingredients: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default DrinkDetail;
