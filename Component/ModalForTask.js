import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTodo } from '../redux/action';
import { useColorScheme } from 'react-native';
const ModalForTask = ({ isVisible, id, hide }) => {
    const theme = useColorScheme()
    const [text, setText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch()
    console.log("ModalForTask component id", id);
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
                setModalVisible(hide);
            }}>
            <View
                style={theme === 'light' ? styles.container_light : styles.container_dark}
            >
                <Text style={styles.textStyle}>Edit the ToDo</Text>
                <SafeAreaView>
                    <TextInput
                        style={theme === 'light' ? styles.textInput_light : styles.textInput_dark}
                        onChangeText={(newText) => {
                            setText(newText)
                            setDisable(false)
                        }
                        }
                        value={text}
                        placeholder="Enter new task ."
                        placeholderTextColor={theme === 'light' ? 'white' : 'black'}
                        keyboardType="default"
                    />
                </SafeAreaView>
                {
                    console.log("Inside modal:", text)}{
                    console.log("Inside modal:", typeof (text))
                }
                <TouchableOpacity
                    disabled={disable}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        hide();
                        setText('')
                        setDisable(true)
                        dispatch(editTodo(id, text));

                    }}>
                    <Text style={theme === 'light' ? styles.buttonStyle_light : styles.buttonStyle_dark}>Save ToDo</Text>
                </TouchableOpacity>
            </View>
        </Modal >


    )
}
const styles = StyleSheet.create({
    container_light: {
        flex: 1,
        backgroundColor: '#BBD6B8',
        height: '100%',
        width: '100%'
    },
    container_dark: {
        flex: 1,
        backgroundColor: '#a9a9a9',
        height: '100%',
        width: '100%'
    },
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#696969',
        textAlign: 'center'
    },
    textInput_light: {
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 20,
        backgroundColor: '#DBE4C6',
    },
    textInput_dark: {
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 20,
        backgroundColor: '#dcdcdc',
        color: 'black'
    },
    buttonStyle_light: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#AEC2B6',
        textAlign: 'center'
    },
    buttonStyle_dark: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#dcdcdc',
        textAlign: 'center',
        color: 'black'
    },
})
export default ModalForTask;