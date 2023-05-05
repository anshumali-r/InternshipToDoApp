import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodoRequest } from '../redux/action';
const windowWidth = Dimensions.get('window').width;

const Completed = () => {

    const dispatch = useDispatch()
    const theme = useColorScheme()
    const data = useSelector(state => state.reducertodo.todoList)
    console.log("Completed Screen:", data)
    const completedData = data.filter(todo => todo.isCompleted === true)
    console.log("Completed Todos : ", completedData)
    // let icon2 = '✅';
    let icon3 = '❌';
    return (
        <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
            <Text style={styles.textStyle}>Completed</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={completedData}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={theme === 'light' ? styles.container_inner_light : styles.container_inner_dark}
                        >
                            {/* <Text>{icon2}</Text> */}
                            <Text
                                style={[
                                    { textAlign: 'center', textDecorationLine: !item.isCompleted ? 'none' : 'line-through' },
                                    theme === 'light' ? styles.todoStyle_light : styles.todoStyle_dark]}>
                                {item.title}
                            </Text>
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => dispatch(deleteTodoRequest(item.id))}
                            >
                                <Text>{icon3}</Text>
                            </TouchableOpacity>
                        </View>

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
        flex: 9
    },
    todoStyle_dark: {
        color: 'black'
    },
})
export default Completed;