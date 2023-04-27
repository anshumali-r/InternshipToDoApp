import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkBox, deleteTodo, fetchTodo } from '../redux/action';
import ModalForTask from './ModalForTask';
import { useColorScheme } from 'react-native';
const windowWidth = Dimensions.get('window').width;


const Task = () => {

  const theme = useColorScheme()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodo());
  }, [])
  const data = useSelector(state => state.reducertodo.todoList)
  console.log("data from store inside Task:", data)
  console.log("typeof data from store inside Task:", typeof (data))
  const [openModalForEditingTask, setOpenModalForEditingTask] = React.useState(false);
  let icon1 = '⬜';
  let icon2 = '✅';
  let icon3 = '❌';
  const [modalVisible, setModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(0);
  // const [textt, setTextt] = useState("");
  const [text, setText] = React.useState('');
  return (
    <View>
      <View >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (

              <View
                style={theme === 'light' ? styles.container_light : styles.container_dark}
              >
                <TouchableOpacity
                  style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => dispatch(checkBox(item.id))} >
                  <Text>{!item.isCompleted ? icon1 : icon2}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}
                  onPress={() => {
                    if (item.isCompleted === false)
                      return (setModalVisible(!modalVisible),
                        setIdForModal(item.id),
                        setOpenModalForEditingTask(true),
                        setText(item.title))
                  }}>
                  <Text style={[{ textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' }, theme === 'light' ? styles.todoStyle_light : styles.todoStyle_dark]}>
                    {item.title}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => dispatch(deleteTodo(item.id))} >
                    <Text>{icon3}</Text>
                  </TouchableOpacity>
                  <ModalForTask isVisible={modalVisible} id={idForModal} hide={() => setModalVisible(false)} />

                </View>
              </View>
            );
          }
          }
          keyExtractor={item => item.id}
        />


      </View>

    </View >
  );
};
const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#DBE4C6',
    width: windowWidth - 10,
    borderRadius: 10,
    padding: 10,
    margin: 6,
    marginRight: 10,
  },
  container_dark: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#dcdcdc',
    width: windowWidth - 10,
    borderRadius: 10,
    padding: 10,
    margin: 6,
    marginRight: 10,
  },
  todoStyle_light: {

  },
  todoStyle_dark: {
    color: 'black'
  }
});


export default Task;
