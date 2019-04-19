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

// database.ref('vendors').push({
//     name: 'Cleanomic',
//     phone: '+60181111111',
//     location: 'Petaling Jaya',
//     availability: true
// });

// database.ref('vendors').push({
//     name: 'Big C',
//     phone: '+60182222222',
//     location: 'Subang Jaya',
//     availability: true
// });

// database.ref('vendors').push({
//     name: 'Cleanity',
//     phone: '+60183333333',
//     location: 'TTDI',
//     availability: true
// });



// let ref = database.ref('jobRequests');
// ref.on('value', (data) => {
//     console.log(data);
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

