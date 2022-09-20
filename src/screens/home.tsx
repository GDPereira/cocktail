import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DrinkFilter from '../components/drinkFilter';
import {Drink} from '../models/drink';
import api from '../services/api';

interface ApiResponse {
  drinks: Drink[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Stack'>;

const Home = ({navigation}: Props) => {
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [glasses, setGlasses] = useState<String[]>([]);
  const [categories, setCategories] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <DrinkFilter
          items={ingredients}
          setItems={setIngredients}
          type={'Ingredients'}
        />
        <DrinkFilter items={glasses} setItems={setGlasses} type={'Glasses'} />
        <DrinkFilter
          items={categories}
          setItems={setCategories}
          type={'Categories'}
        />
      </ScrollView>
      {isLoading && (
        <ActivityIndicator style={styles.loading} size="large" color="grey" />
      )}
      <TouchableOpacity
        style={styles.containerButton}
        onPress={async () => {
          setIsLoading(true);
          const objSearchParams: any = {};

          if (ingredients.length > 0) {
            objSearchParams.i = String(ingredients);
          }
          if (glasses.length > 0) {
            objSearchParams.g = String(glasses);
          }
          if (categories.length > 0) {
            objSearchParams.c = String(categories);
          }

          const searchParams = new URLSearchParams(objSearchParams);

          const endponit = 'filter.php?' + searchParams;

          const {drinks} = await api<ApiResponse>(endponit, {method: 'GET'});

          if (typeof drinks !== 'object') {
            Alert.alert('Not found', 'No drink found');
            setIsLoading(false);
            return;
          }

          navigation.push('ListDrinks', {drinks});
          setIsLoading(false);
        }}>
        <Text style={styles.textButton}>SEARCH</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginBottom: 30,
  },
  backgroundStyle: {
    padding: 10,
    flex: 1,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'green',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

export default Home;
