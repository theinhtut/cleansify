import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetRequests } from './actions/requests';
import database from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
// store.dispatch(addRequest({ email: 'test1@gmail.com', location: 'Cheras', date: 1555561570980 }));
// store.dispatch(addRequest({ email: 'test2@gmail.com', location: 'TTDI', date: 1555992000000 }));
console.log(store.getState());

// database.ref('vendors').push({
//     name: 'Washly @SW',
//     phone: '+60174444444',
//     location: 'Petaling Jaya',
//     availability: true
// });

let availableVendors = [];


let ref = database.ref('vendors');
ref.on('value', (data) => {
    // console.log(data.val());
    let result = data.val();
    let keys = Object.keys(result);

    // console.log(result);
    
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let vendorLocation = result[k].location;
        let vendorAvailability = result[k].availability;
        
        
        if(  vendorLocation === 'TTDI' && vendorAvailability === true ){
            availableVendors.push(result[k]);
            
        } else {
            
        }
    }
    console.log(availableVendors);
});

// console.log('availableVendors: ' + availableVendors);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>

);
ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

store.dispatch(startSetRequests()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

