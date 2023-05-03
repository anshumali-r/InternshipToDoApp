import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTodo } from '../redux/action';
import { useColorScheme } from 'react-native';
const ModalForTask = ({ isVisible, id, onPressCancel, title }) => {
    const theme = useColorScheme()
    const [text, setText] = useState('');
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch()
    return (
        <Modal
            animationType="fade"
            statusBarTranslucent={true}
            transparent={true}
            visible={isVisible}
        >
            <View
                style={theme === 'light' ? styles.container_light : styles.container_dark}
            >
                <View style={{ flexDirection: "row", flex: 1, }}>
                    <View style={{ flex: 9 }}>
                        <Text style={styles.textStyle}>Edit the ToDo</Text>
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
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={theme === 'light' ? styles.textInput_light : styles.textInput_dark}
                            onChangeText={(newText) => {
                                setText(newText)
                                setDisable(false)
                            }
                            }
                            defaultValue={title}
                            editable={true}
                            placeholderTextColor={theme === 'light' ? 'white' : 'black'}
                            keyboardType="default"
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <TouchableOpacity
                            disabled={disable}
                            onPress={() => {
                                onPressCancel()
                                setText('')
                                dispatch(editTodo(id, text));

                            }}>
                            <Text style={theme === 'light' ? styles.buttonStyle_light : styles.buttonStyle_dark}>Save ToDo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >


    )
}
const styles = StyleSheet.create({
    container_light: {
        flex: 1,
        backgroundColor: '#BBD6B8',
        marginTop: 160,
        width: '90%',
        marginBottom: 160,
        marginLeft: 20,
        borderRadius: 20,
        backgroundColor: '#F6FFDE',
        padding: 15,
    },
    container_dark: {
        flex: 1,
        backgroundColor: '#a9a9a9',
        marginTop: 160,
        width: '90%',
        marginBottom: 160,
        marginLeft: 20,
        borderRadius: 20,
        marginBottom: 160,
        backgroundColor: '#B7B7B7',
        padding: 15,
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
        borderRadius: 10,
    },
    textInput_dark: {
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 20,
        backgroundColor: '#dcdcdc',
        color: 'black',
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
    buttonStyle_dark: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#dcdcdc',
        textAlign: 'center',
        color: 'black',
        borderRadius: 10,
    },
})
export default ModalForTask;