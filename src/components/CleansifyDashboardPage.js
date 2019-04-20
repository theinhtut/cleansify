import React from 'react';
import RequestList from './RequestList';
import RequestSummary from './RequestSummary';

const CleansifyDashboardPage = () => (
    <div>
        <RequestSummary/>
        <RequestList/>
    </div>
);

export default CleansifyDashboardPage;