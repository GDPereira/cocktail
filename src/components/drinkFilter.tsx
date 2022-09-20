import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {checkTextIsEmpty} from '../helpers/utils';
import Input from './input';

type DrinkFilterProps = {
  items: String[];
  setItems: (params: (oldItems: String[]) => String[]) => void;
  type: string;
};

const DrinkFilter = ({
  items,
  setItems,
  type,
}: DrinkFilterProps): JSX.Element => {
  return (
    <>
      <Input
        placeholder={type}
        onPress={text => {
          if (checkTextIsEmpty(text)) {
            Alert.alert('Warning', `You must fill the ${type}`);
            return;
          }

          setItems(oldItems => [...oldItems, text]);
        }}
      />

      {items.length > 0 ? (
        <View style={styles.containerList}>
          {items.map((ingredient, index) => {
            return (
              <View key={index} style={styles.containerRow}>
                <Text style={styles.textRow} key={index}>
                  {ingredient}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setItems(oldIngredients =>
                      oldIngredients.filter((_, i) => i !== index),
                    )
                  }>
                  <Icon name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.containerNoItems}>
          <Text style={styles.textNoItems}>No {type}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerList: {
    borderRadius: 15,
    marginTop: 20,
    paddingTop: 0,
    padding: 10,
  },
  containerRow: {
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  textRow: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  containerNoItems: {
    marginTop: 20,
  },
  textNoItems: {
    color: '#aaa',
    textAlign: 'center',
  },
});

export default DrinkFilter;
