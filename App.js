import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard, View, Alert } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import Sandbox from './components/Sandbox';

export default function App() {

    const [todo, setTodo] = useState([{ name: 'Learn React', key: 1 },
        { name: 'Build App', key: 2 },
        { name: 'Publish App', key: 3 }]);

    const pressHandler = (key) => {
        setTodo((prevTodos) => {
            return prevTodos.filter(todos => todos.key.toString() != key);
        });
    };

    const submitHandler = (textt) => {

        if (textt.length > 3) {
            setTodo((prevTodo) => {
                return [
                    { name: textt, key: Math.random().toString() },
                    ...prevTodo
                ];
            });
        } else {
            Alert.alert('Check', 'TODO must be atleast 4 chars long', [
                { text: 'okay', onPress: () => console.log('okay')}
            ]);
        } 
    }

    return (
      //  <Sandbox />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>

              <Header />

              <View style={styles.content}>

                  <AddTodo submitHandler={submitHandler} />

                  <View style={styles.list}>

                       <FlatList
                          data={todo}
                          renderItem={({ item }) => (
                              <TodoItem
                                  item={item}
                                  pressHandler={pressHandler} />
                          )} />

                  </View>
              </View>
              <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
        flex: 1,
    },
    list: {
        marginTop: 20,
        flex: 1,
    }
});
