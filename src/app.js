import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import { addRequest } from './actions/requests';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addRequest({ email: 'test@gmail.com', location: 'Cheras', date: 123123123 }));
console.log(store.getState());

const jsx = (<Header />);

ReactDOM.render(<AppRouter/>, document.getElementById('app'));