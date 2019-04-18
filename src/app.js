import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetRequests } from './actions/requests';
import database from './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
// store.dispatch(addRequest({ email: 'test1@gmail.com', location: 'Cheras', date: 1555561570980 }));
// store.dispatch(addRequest({ email: 'test2@gmail.com', location: 'TTDI', date: 1555992000000 }));
console.log(store.getState());

// database.ref().push({
//     name1: 'test1'
// });

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>

);
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetRequests()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

