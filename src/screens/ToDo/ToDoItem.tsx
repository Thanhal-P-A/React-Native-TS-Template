import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';
import Button from '../../components/Button';
import {ToDoItem} from '../../models';

export const ToDoItemComponent: React.FC<{
  todo: ToDoItem;
  deleteItem: Function;
}> = ({todo: {id, value}, deleteItem}) => {
  return (
    <View style={styles.todoContainer}>
      <Text style={styles.sectionTitle}>{value}</Text>
      <Button onPress={() => deleteItem(id)} title="done" />
    </View>
  );
};
const styles = StyleSheet.create({
  todoContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.Black,
  },
  sectionTitle: {
    fontSize: Fonts.FONT_16,
    color: Colors.LightGrey,
  },
});
