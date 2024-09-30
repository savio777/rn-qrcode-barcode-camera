import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../../colors';

type Props = {
  title: string;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.blue,
  },
  textButton: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: 'bold',
  },
});

const ButtonHome: React.FC<Props> = ({onPress, title}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.textButton}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonHome;
