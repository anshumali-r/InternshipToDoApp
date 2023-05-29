import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskRequest } from '../redux/action';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scheduleNotification } from './Notifications';
import Notifications from './Notifications';
import Notification from '@notifee/react-native'
// const windowWidth = Dimensions.get('window').width;

const AddTaskModal = ({ isVisible, onPressCancel }) => {

    let iconName = 'close-circle';
    const showToast = () => {
        ToastAndroid.show('New Task Added', ToastAndroid.SHORT);
    };

    const [date, setDate] = useState(new Date())
    let dt = JSON.stringify(date)
    let day = dt.slice(9, 11)
    let month = dt.slice(6, 8)
    let year = dt.slice(1, 5)
    // const hours = dt.slice(12, 14);
    // const minutes = dt.slice(15, 17);
    // const seconds = date.getSeconds();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const selectedDate = `${day}-${month}-${year}`;
    const selectedTime = `${hours}:${minutes}`;
    // console.log("TYPE OF SELECTED TIME IN ADD TASK MODAL:", typeof (selectedTime))
    const [openTime, setOpenTime] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [disable, setDisable] = useState(true)
    const [text, setText] = useState('')
    const [number, setNumber] = useState('')
    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() + +number);
    const selectedTimeAhead = currentDateTime.toISOString()
    console.log("SELECTED TIME AHEAD:", selectedTimeAhead)
    console.log("TYPE OF SELECTED TIME AHEAD:", typeof new Date(selectedTimeAhead))
    console.log("DATE:", date)
    console.log("typeof DATE:", typeof date)

    const dispatch = useDispatch()
    const handleAddTaskClick = () => {
        const id = Math.floor(Math.random() * 100000)
        const taskText = text;
        setText('')
        setDisable(true);
        // console.log("inside handleAddTaskClick:", taskText);
        dispatch(addTaskRequest(taskText, selectedDate, selectedTime, id));
        // console.log("text,date,time and typeof date:", text, date, selectedTime, typeof (date))
        try {
            // console.log(" number of minutes ::", number)
            scheduleNotification({ reminder: text, date: date, minutes: +number, id: id });
            // let newTimestamp = new Date(Date.now() + (+number + 1) * (60000)).toISOString();
            // let newDate = date.setMinutes(date.getMinutes() + number);
            // console.log("TYPE OF NEW DATE", typeof (newTimestamp))
            // console.log("NEW DATE", newTimestamp)
            // scheduleNotification({ reminder: text, date: new Date(newTimestamp), minutes: 0, id: id + 1 })
        } catch (err) {
            console.log("Error scheduling notification", err)
        }
        onPressCancel()
        showToast()
    }

    return (
        <View >
            <Modal
                onRequestClose={onPressCancel}
                animationType="fade"
                statusBarTranslucent={true}
                transparent={true}
                visible={isVisible}
            >
                <View style={styles.container}>
                    <View style={{ flex: 2, alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={onPressCancel} >
                            <Ionicons name={iconName} size={35} color='#dc143c' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 9 }}>
                        <View >
                            <TextInput
                                style={styles.textInput_light}
                                placeholder="Enter your task here."
                                keyboardType="default"
                                defaultValue={text}
                                onChangeText={newText => {
                                    setText(newText);

                                }}
                                multiline={true}
                            />
                        </View>
                        <View >
                            <TextInput
                                style={styles.textInput_light}
                                placeholder="How many minutes before you want reminder."
                                placeholderTextColor={'gray'}
                                keyboardType="numeric"
                                defaultValue={number}
                                onChangeText={number => {
                                    setNumber(number);
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <TouchableOpacity
                                style={styles.addTaskButtonStyle_light}
                                onPress={() => setOpenDate(true)}
                            >
                                <Text>Select Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.addTaskButtonStyle_light}
                                onPress={() => setOpenTime(true)}
                            >
                                <Text>Select Time</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center' }}
                                onPress={handleAddTaskClick}
                                disabled={disable}>
                                <Text
                                    style={styles.addTaskButtonStyle_light}
                                >
                                    Add Task
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal >
            <DatePicker
                modal
                mode="date"
                open={openDate}
                date={date}
                minimumDate={date}
                onConfirm={(date) => {
                    setOpenDate(false)
                    setDate(date)
                    // setDisable(false)
                }}
                onCancel={() => {
                    setOpenDate(false)
                }}
            />
            <DatePicker
                // is24hourSource="locale"
                modal
                mode="time"
                open={openTime}
                date={date}
                // minimumDate={date}
                minimumDate={new Date(selectedTimeAhead)}
                defaultDate={new Date(selectedTimeAhead)}
                onConfirm={(date) => {
                    setOpenTime(false)
                    setDate(date)
                    setDisable(false);
                }}
                onCancel={() => {
                    setOpenTime(false)
                }}
            />

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#577D86',
        marginTop: 100,
        width: '90%',
        maxHeight: '40%',
        // marginBottom: 260,
        marginLeft: 20,
        marginEnd: 10,
        borderRadius: 20,
        // backgroundColor: '#F6FFDE',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    addTaskButtonStyle_light: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#B9EDDD',
    },
    textInput_light: {
        width: '90%',
        // height: ,
        marginTop: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 20,
        backgroundColor: '#B9EDDD',
        alignSelf: 'center'
    },
})
export default AddTaskModal;