import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('e :>> ', e);
  }
};

export const setFavorite = async (key: string, value: boolean) => {
  storeData(key, `${value}`);
};

export const getData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }

    return '';
  } catch (e) {
    console.log('e :>> ', e);
    return '';
  }
};

export const isFavoriteStorage = async (key: string): Promise<boolean> => {
  const data = await getData(key);

  return data === 'true';
};
