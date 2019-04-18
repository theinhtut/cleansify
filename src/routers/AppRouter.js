import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddRequestPage from '../components/AddRequestPage';
import CleansifyDashboardPage from '../components/CleansifyDashboardPage';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={CleansifyDashboardPage} exact={true} />
        <Route path="/create" component={AddRequestPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
