import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkBoxRequest, deleteTodoRequest, apiCall } from '../redux/action';
import EditTaskModal from './EditTaskModal';
import { useColorScheme } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const Task = () => {
  const theme = useColorScheme()
  const dispatch = useDispatch()
  const [showActivityIndicator, setShowActivityIndicator] = useState(false)

  const displayActivityIndicator = () => {
    setShowActivityIndicator(true)
    setTimeout(() => {
      setShowActivityIndicator(false)
    }, 2000)
  }
  const LoadingAnimation = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          size="large"
          color='#6495ed'
          animating={showActivityIndicator}
        />
        <Text>Loading Todos...</Text>
      </View>
    )
  }
  const data1 = useSelector(state => state.reducertodo.todoList)
  // console.log("data from store inside Task:", data1)
  // console.log("typeof data from store inside Task:", typeof (data1))
  useEffect(() => {
    // console.log("INSIDE Task.js useEffect");
    if (!data1 || data1.length === 0) {
      displayActivityIndicator();
      dispatch(apiCall());
    }
  }, []);
  let icon1 = '⬜';
  let icon2 = '✅';
  let icon3 = '❌';
  const [modalVisible, setModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(0);
  const [text, setText] = React.useState('');
  const [editItem, setEditItem] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} >
        {showActivityIndicator ?
          <LoadingAnimation />
          :
          <FlatList
            data={data1}
            renderItem={({ item }) => {
              return (

                <View
                  style={theme === 'light' ? styles.container_light : styles.container_dark}
                >
                  <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => dispatch(checkBoxRequest(item.id))} >
                    <Text>{!item.isCompleted ? icon1 : icon2}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}
                    onPress={() => {
                      if (item.isCompleted === false)
                        return (setModalVisible(!modalVisible),
                          setIdForModal(item.id),
                          setSelectedId(item.id),
                          setSelectedTitle(item.title),
                          setText(item.title));
                      setEditItem(item.id)
                    }}>
                    <Text
                      style={[
                        { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                        theme === 'light' ? styles.todoStyle_light : styles.todoStyle_dark]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                      style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                      onPress={() => dispatch(deleteTodoRequest(item.id))} >
                      <Text>{icon3}</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              );
            }
            }
            keyExtractor={item => item.id}
          />
        }
        {
          selectedId !== '' &&
          <EditTaskModal
            isVisible={modalVisible}
            id={selectedId}
            onPressCancel={() => setModalVisible(false)}
            title={selectedTitle} />
        }
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
  },


});


export default Task;
