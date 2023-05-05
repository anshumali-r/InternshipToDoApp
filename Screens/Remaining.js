import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkBoxRequest, deleteTodoRequest } from '../redux/action';
import EditTaskModal from '../Component/EditTaskModal';
const windowWidth = Dimensions.get('window').width;

const Remaining = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [idForModal, setIdForModal] = useState(0);
    const [text, setText] = React.useState('');
    const [editItem, setEditItem] = useState('');
    const dispatch = useDispatch()
    const theme = useColorScheme()
    const data = useSelector(state => state.reducertodo.todoList)
    console.log("Completed Screen:", data)
    const completedData = data.filter(todo => todo.isCompleted === false)
    console.log("Completed Todos : ", completedData)
    let icon1 = '⬜';
    let icon2 = '✅';
    let icon3 = '❌';
    return (
        <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
            <Text style={styles.textStyle}>Remaining</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={completedData}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={theme === 'light' ? styles.container_inner_light : styles.container_inner_dark}
                        >
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => dispatch(checkBoxRequest(item.id))} >
                                <Text>{!item.isCompleted ? icon1 : icon2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}
                                onPress={() => {
                                    (item.isCompleted === false)
                                    return (setModalVisible(!modalVisible),
                                        setIdForModal(item.id),
                                        setSelectedId(item.id),
                                        setSelectedTitle(item.title),
                                        setText(item.title),
                                        setEditItem(item.id)
                                    )
                                }}
                            >
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
                                    onPress={() => dispatch(deleteTodoRequest(item.id))}
                                >
                                    <Text>{icon3}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }}

            />
            {
                selectedId !== '' &&
                <EditTaskModal
                    isVisible={modalVisible}
                    id={selectedId}
                    onPressCancel={() => setModalVisible(false)}
                    title={selectedTitle} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container_inner_light: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#DBE4C6',
        width: windowWidth - 10,
        borderRadius: 10,
        padding: 10,
        margin: 6,
        marginRight: 10,
    },
    container_inner_dark: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#dcdcdc',
        width: windowWidth - 10,
        borderRadius: 10,
        padding: 10,
        margin: 6,
        marginRight: 10,
    },
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
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#696969',
        textAlign: 'center',
        paddingTop: 20
    },
    todoStyle_light: {

    },
    todoStyle_dark: {
        color: 'black'
    },
})
export default Remaining;