import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskInput from './Component/TaskInput';
import { useColorScheme } from 'react-native';
const App = () => {
  const theme = useColorScheme()
  return (
    <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
      <TaskInput />
    </View>
  )
}
const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BBD6B8'
  },
  container_dark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a9a9a9'
  },
})
export default App;