import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Button from '../../components/Button';
import {ToDoItemComponent} from './ToDoItem';
import {ToDoItem} from '../../models';
import {
  getTodoItems,
  saveTodoItems,
  createTable,
  deleteTodoItem,
} from '../../common/SQLDB';
import Fonts from '../../assets/Fonts';
import Colors from '../../assets/Colors';

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const loadDataCallback = useCallback(async () => {
    try {
      await createTable();
      const storedTodoItems = await getTodoItems();
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [
        ...todos,
        {
          id: todos.length
            ? todos.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur;
                return acc;
              }).id + 1
            : 0,
          value: newTodo,
        },
      ];
      setTodos(newTodos);
      await saveTodoItems(newTodos);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await deleteTodoItem(id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} contentInsetAdjustmentBehavior="automatic">
      <View>
        {todos.map(todo => (
          <ToDoItemComponent
            key={todo.id}
            todo={todo}
            deleteItem={deleteItem}
          />
        ))}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
        />
        <Button onPress={addTodo} title="Add ToDo" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInputContainer: {
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    fontSize: Fonts.FONT_18,
    color: Colors.LightGrey,
  },
});

export default ToDo;
