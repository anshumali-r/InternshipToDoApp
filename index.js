/**
 * @format
 */

import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from './redux/store';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const todoApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

);

AppRegistry.registerComponent(appName, () => todoApp);
