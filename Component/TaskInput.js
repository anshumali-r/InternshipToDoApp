import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import Task from './Task';
import { useDispatch, } from 'react-redux';
import { addTaskRequest } from '../redux/action';
import { useColorScheme } from 'react-native';
const TaskInput = () => {
  const [disable, setDisable] = useState(true)
  const [text, setText] = useState('')
  const theme = useColorScheme()
  const dispatch = useDispatch()

  const handleAddTaskClick = () => {
    const taskText = text;
    setText('')
    setDisable(true);
    // console.log("inside handleAddTaskClick:", taskText);
    dispatch(addTaskRequest(taskText));
  }

  return (
    <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
      <Text style={[styles.textStyle, { textAlign: 'center', paddingTop: 20 }]}>
        ToDo App !
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={theme === 'light' ? styles.textInput_light : styles.textInput_dark}
          placeholder="Enter your task here."
          placeholderTextColor={theme === 'light' ? 'gray' : 'black'}
          keyboardType="default"
          defaultValue={text}
          onChangeText={newText => {
            setText(newText);
            setDisable(false);
          }}
          multiline={true}
        />
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={handleAddTaskClick}
          disabled={disable}>
          <Text
            style={theme === 'light' ? styles.addTaskButtonStyle_light : styles.addTaskButtonStyle_dark}
          >
            Add Task
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[{ textAlign: 'center' }, theme === 'light' ? styles.listOfTask_light : styles.listOfTask_dark]}>List of Task</Text>
      </View>
      <Task />

    </View>
  );
};
const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BBD6B8',
  },
  container_dark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
  },
  addTaskButtonStyle_dark: {
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#dcdcdc',
    color: 'black'
  },
  addTaskButtonStyle_light: {
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#DBE4C6',
  },
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#696969',
  },
  textInput_light: {
    width: '60%',
    // height: ,
    margin: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 20,
    backgroundColor: '#DBE4C6',
  },
  textInput_dark: {
    width: '60%',
    // height: ,
    margin: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 20,
    backgroundColor: '#dcdcdc',
    color: 'black'
  },
  listOfTask_light: {

  },
  listOfTask_dark: {
    color: 'black'
  }
});

export default TaskInput;
