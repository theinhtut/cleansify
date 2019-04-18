import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import { addRequest } from './actions/requests';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addRequest({ email: 'test1@gmail.com', location: 'Cheras', date: 123123123 }));
store.dispatch(addRequest({ email: 'test2@gmail.com', location: 'TTDI', date: 22334455 }));
console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>

);

ReactDOM.render(jsx, document.getElementById('app'));