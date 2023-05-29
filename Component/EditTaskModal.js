import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTodoRequest } from '../redux/action';
import DatePicker from 'react-native-date-picker'
import { cancelNotification } from './Notifications';
import { scheduleNotification } from './Notifications';

const EditTaskModal = ({ isVisible, id, onPressCancel, title, date, time }) => {
    const [dateN, setDateN] = useState(new Date())
    const [text, setText] = useState('');
    const [disable, setDisable] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    // const year = currentDate.getFullYear();
    // const month = currentDate.getMonth() + 1;
    // const day = currentDate.getDate();
    let dt = JSON.stringify(currentDate)
    let day = dt.slice(9, 11)
    let month = dt.slice(6, 8)
    let year = dt.slice(1, 5)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const selectedDate = `${day}-${month}-${year}`;
    const selectedTime = `${hours}:${minutes}:${seconds}`;

    const dispatch = useDispatch()

    return (
        <View>
            <Modal
                onRequestClose={onPressCancel}
                animationType="fade"
                statusBarTranslucent={true}
                transparent={true}
                visible={isVisible}
            >
                <View
                    style={styles.container_light}
                >
                    <View style={{ flexDirection: "row", flex: 1, }}>
                        <View style={{ flex: 9 }}>
                            <Text style={styles.textStyleHeading}>Edit the ToDo</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={onPressCancel}
                                style={{ borderRadius: 10, }}
                            >
                                <Text style={{ textAlign: 'center' }}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 4 }}>
                        <View
                            style={{ flex: 4, alignItems: 'center' }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenDate(true)
                                }}
                            >
                                <Text style={styles.textStyle}>Date:{selectedDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenTime(true)
                                }}
                            >
                                <Text style={styles.textStyle}>Time:{selectedTime}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput_light}
                                onChangeText={(newText) => {
                                    setText(newText)
                                    setDisable(false)
                                }
                                }
                                defaultValue={title}
                                editable={true}
                                multiline={true}
                                keyboardType="default"
                            />

                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                disabled={disable}
                                onPress={() => {
                                    onPressCancel()
                                    dispatch(editTodoRequest(id, text, selectedDate, selectedTime));
                                    // setText('')
                                    cancelNotification(id + "");
                                    scheduleNotification({ reminder: text, date: dateN, minutes: 0, id: id });

                                }}>
                                <Text style={styles.buttonStyle_light}>Save ToDo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
            <DatePicker
                modal
                mode="date"
                open={openDate}
                date={currentDate}
                minimumDate={currentDate}
                onConfirm={(date) => {
                    setOpenDate(false)
                    setDateN(date)
                    setCurrentDate(date)
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
                date={currentDate}
                minimumDate={currentDate}
                onConfirm={(date) => {
                    setOpenTime(false)
                    setDateN(date)
                    setCurrentDate(date)
                }}
                onCancel={() => {
                    setOpenTime(false)
                }}
            />
        </View>


    )
}
const styles = StyleSheet.create({
    container_light: {
        flex: 1,
        backgroundColor: '#577D86',
        marginTop: 160,
        width: '90%',
        marginBottom: 160,
        marginLeft: 20,
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

    textStyleHeading: {
        fontSize: 28,
        fontWeight: 'bold',
        // color: '#696969',
        color: 'white',
        textAlign: 'center'
    },
    textStyle: {
        fontSize: 25,
        fontWeight: '400',
        // color: '#696969',
        color: 'white',
        textAlign: 'center',
        padding: 5
    },
    textInput_light: {
        // height: '100%',
        width: '100%',
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 20,
        backgroundColor: '#B9EDDD',
        borderRadius: 10,
    },

    buttonStyle_light: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#AEC2B6',
        textAlign: 'center',
        borderRadius: 10,
    },
})
export default EditTaskModal;