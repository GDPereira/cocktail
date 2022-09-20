import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type BackButtonProps = {
  onPress: () => void;
  color: string;
};

const BackButton = ({color, onPress}: BackButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.backButton}>
      <Icon name="left" size={30} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingTop: 10,
  },
});

export default BackButton;
