import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type InputProps = {
  onPress: (text: string) => void;
  placeholder: string;
};

const Input = ({onPress, placeholder}: InputProps): JSX.Element => {
  const [text, setText] = useState('');

  return (
    <View style={styles.view}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity
        onPress={() => {
          onPress(text);
          setText('');
        }}
        style={styles.containerIcon}>
        <Icon name="plus" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 15,
    padding: 10,
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
