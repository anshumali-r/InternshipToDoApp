import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import AddTaskModal from './AddTaskModal';
import { checkBoxRequest, deleteTodoRequest, apiCall } from '../redux/action';
import EditTaskModal from './EditTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import notifee from '@notifee/react-native';
import * as Animatable from 'react-native-animatable';
import { cancelNotification } from './Notifications';
const Home = ({ navigation }) => {

  const [startAnimation, setStartAnimation] = useState(true);
  const calenderRef = useRef()
  let iconName = 'add-circle'
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDateModal, setSelectedDateModal] = useState("");
  const [selectedTimeModal, setSelectedTimeModal] = useState("");
  const [text, setText] = useState('');
  const [editItem, setEditItem] = useState('');

  let icon1 = '⬜';
  let icon2 = '✅';
  let icon3 = '❌';
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn()
  }, [])


  const dispatch = useDispatch()
  let newData = null;
  // const [displayTodaysTodo, setDisplayTodaysTodo] = useState(false)
  const [date, setDate] = useState(new Date())
  // console.log("new Date() ka format:", date)
  // const [openDate, setOpenDate] = useState(false)
  let dt = JSON.stringify(date)
  let day = dt.slice(9, 11)
  let month = dt.slice(6, 8)
  let year = dt.slice(1, 5)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dateSelected = `${day}-${month}-${year}`;

  const selectedTime = `${hours}:${minutes}:${seconds}`;

  const [currentSelectedDate, setCurrentSelectedDate] = useState(dateSelected)

  const [selectedDate, setSelectedDate] = useState(dateSelected)
  // console.log("DATE SELECTED:", selectedDate)
  const data = useSelector(state => state.reducertodo.todoList)
  const [displayableData, setDisplayableData] = useState()
  if (data !== undefined) {
    const displayableData = data.filter(todo => todo.date === selectedDate)
  }
  // const [displayableData, setDisplayableData] = useState([])


  useEffect(() => {
    // console.log("INSIDE Task.js useEffect");
    if (!data || data.length === 0) {
      dispatch(apiCall());
    }
  },);

  // const displayableData = data.filter(todo => todo.date === selectedDate)
  // console.log("DISPLAYABLE DATA:", displayableData)
  // console.log(`Date: ${day}-${month}-${year}`);
  // console.log(`Time: ${hours}:${minutes}:${seconds}`);

  const handleAddTaskOnPress = () => {
    // console.log("Inside handleAddTaskOnPress")
    setAddTaskModalVisible(true)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStartAnimation(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const updatedList = data.filter(todo => todo.date === currentSelectedDate)
    setDisplayableData(updatedList)
  }, [data])

  return (
    <View style={styles.container_light}>

      <View style={styles.logoContainer}>
        <Animated.View
          style={[{ opacity: fadeAnimation }]}
        >
          <Image
            style={styles.logo}
            source={require('E:/MyProjects/ToDo/assets/img/ToDo.png')}
          />
        </Animated.View>
      </View>
      <View
        style={styles.calenderStrip}
      >

        <CalendarStrip
          scrollable
          ref={calenderRef}
          style={styles.calenderStrip}
          calendarColor={'#569DAA'}
          calendarHeaderStyle={{ color: 'white' }}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={date}
          onDateSelected={(date) => {
            // console.log(date)
            let tempDate = JSON.stringify(date)
            // console.log("String date:", tempDate)
            let day = tempDate.slice(9, 11)
            let month = tempDate.slice(6, 8)
            let year = tempDate.slice(1, 5)
            let formattedDate = `${day}-${month}-${year}`
            // console.log(JSON.parse(formattedDate))
            // console.log("formatted date and its type :", `"${formattedDate}"`, typeof (formattedDate))
            setSelectedDate(`"${formattedDate}"`)
            // console.log("Calender strip k ander data:", data)
            setCurrentSelectedDate(formattedDate)
            // console.log("newData : ", newData)
            setDisplayableData(() => data.filter(todo => todo.date === formattedDate)) //anshu

            // console.log("DISPLAYABLE DATA inside calender:", displayableData)
            // setDisplayTodaysTodo(true)
          }}

        />
        <View style={{ flex: 4 }}>
          {
            // displayableData ?
            <FlatList
              // extraData={data}
              // extraData={displayableData}
              keyExtractor={item => item.id}
              data={displayableData} //anshu
              renderItem={({ item }) => {
                return (
                  <Animatable.View
                    animation={startAnimation ? 'fadeInUp' : undefined}
                    duration={1000}
                    delay={300}
                    onAnimationEnd={() => setStartAnimation(false)}
                    style={styles.container_inner_light}
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
                            setSelectedDateModal(item.date),
                            setSelectedTimeModal(item.time),
                            setSelectedTitle(item.title),
                            setText(item.title),
                            setEditItem(item.id)
                          )
                      }}
                    >
                      <View>
                        <Text
                          style={[
                            { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                            styles.todoStyle_light]}>
                          Title:{item.title}

                        </Text>
                        <Text
                          style={[
                            { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                            styles.todoStyle_light]}>
                          Completion date:{item.date}
                        </Text>
                        <Text
                          style={[
                            { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                            styles.todoStyle_light]}>
                          Completion time:{item.time}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                          dispatch(deleteTodoRequest(item.id))
                          cancelNotification(item.id + "");
                          // cancelNotification(item.id + 1 + "");
                        }}
                      >
                        <Text>{icon3}</Text>
                      </TouchableOpacity>

                    </View>
                  </Animatable.View>
                )
              }}
            />
            // : null
          }
        </View>
        <View style={styles.addTaskIconStyle}>
          <TouchableOpacity
            onPress={handleAddTaskOnPress}
          >
            <Ionicons name={iconName} size={45} color='#577D86' />
          </TouchableOpacity>
        </View>

      </View>
      {
        // addTaskModalVisible === true &&
        <AddTaskModal
          isVisible={addTaskModalVisible}
          onPressCancel={() => setAddTaskModalVisible(false)}
        />
      }
      {
        selectedId !== '' &&
        <EditTaskModal
          isVisible={modalVisible}
          id={selectedId}
          onPressCancel={() => setModalVisible(false)}
          title={selectedTitle}
          date={selectedDate}
          time={selectedTime}
        />
      }
    </View>
  );
};
const styles = StyleSheet.create({
  addTaskIconStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CBB9',

  },
  calenderStrip: {
    // margin: 20,
    flex: 2,
    minHeight: 1,
    minWidth: '96%',
    widhth: '100%',
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,

  },
  container_inner_light: {
    // flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#B9EDDD',
    borderRadius: 10,
    padding: 5,
    margin: 10,

  },
  logoContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  logo: {
    // flex: 1,
    width: 200,
    height: 200,
    borderRadius: 15,
    margin: 10,

  },
  container_light: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#87CBB9',
  },
});
export default Home;