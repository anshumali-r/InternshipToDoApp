import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodoRequest } from '../redux/action';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;

const Completed = ({ navigation }) => {
    const dispatch = useDispatch()
    const [startAnimation, setStartAnimation] = useState(true);

    const data = useSelector(state => state.reducertodo.todoList)
    // console.log("Completed Screen:", data)
    const completedData = data.filter(todo => todo.isCompleted === true)
    // console.log("Completed Todos : ", completedData)
    // let icon2 = '✅';
    let icon3 = '❌';
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStartAnimation(true);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container_light}>
            <Text style={styles.textStyle}>Completed</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={completedData}
                renderItem={({ item, index }) => {
                    return (
                        <Animatable.View
                            animation={startAnimation ? 'fadeInUp' : undefined}
                            duration={1000}
                            delay={300}
                            onAnimationEnd={() => setStartAnimation(false)}
                            style={styles.container_inner_light}
                        >

                            <View style={[
                                { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                                styles.todoStyle_light]}>
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
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => dispatch(deleteTodoRequest(item.id))}
                            >
                                <Text>{icon3}</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                    )
                }}

            />
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
    todoStyle_light: {
        flex: 9
    },
})
export default Completed;