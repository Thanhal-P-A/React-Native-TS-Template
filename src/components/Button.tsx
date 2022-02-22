import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Colors from '../assets/Colors';
import Fonts from '../assets/Fonts';

interface IButton {
  onPress: () => void;
  title: string;
}
const Button = (props: IButton) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary
  },
  title: {
    fontSize: Fonts.FONT_16,
  },
});
