import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkBoxRequest, deleteTodoRequest } from '../redux/action';
import EditTaskModal from '../Component/EditTaskModal';
import * as Animatable from 'react-native-animatable';
import { cancelNotification } from '../Component/Notifications';
const windowWidth = Dimensions.get('window').width;

const Remaining = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [idForModal, setIdForModal] = useState(0);
    const [text, setText] = React.useState('');
    const [editItem, setEditItem] = useState('');
    const [startAnimation, setStartAnimation] = useState(true);

    const dispatch = useDispatch()
    const data = useSelector(state => state.reducertodo.todoList)
    // console.log("Completed Screen:", data)
    const completedData = data.filter(todo => todo.isCompleted === false)
    // console.log("Completed Todos : ", completedData)
    let icon1 = '⬜';
    let icon2 = '✅';
    let icon3 = '❌';
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStartAnimation(true);
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container_light} >
            <Text style={styles.textStyle}>Remaining</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={completedData}
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
                                    }}
                                >
                                    <Text>{icon3}</Text>
                                </TouchableOpacity>

                            </View>
                        </Animatable.View>
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
        backgroundColor: '#B9EDDD',
        width: windowWidth - 10,
        borderRadius: 10,
        padding: 10,
        margin: 6,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },

    container_light: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#87CBB9',
    },

    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#696969',
        textAlign: 'center',
        paddingTop: 20
    },

})
export default Remaining;