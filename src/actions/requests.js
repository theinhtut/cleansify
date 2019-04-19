import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_REQUEST
export const addRequest = (request) => ({
  type: 'ADD_REQUEST',
  request
});

// Writing to Firebase's Database
export const startAddRequest = (requestData = {}) => {
    return (dispatch) => {
      const {
        email = '',
        location = '',
        date = 0,
        vendorName = ''
    } = requestData;
    const request = { email, location, date, vendorName };

    return database.ref('jobRequests').push(request).then((ref) => {
        dispatch(addRequest({
          id: ref.key,
          ...request
        }
        ));
    });
    };
};

// SET_REQUESTS
export const setRequests = (requests) => ({
  type: 'SET_REQUESTS',
  requests
});

// Fetching from Firebase's Database
export const startSetRequests = () => {
    return (dispatch) => {
      return database.ref('jobRequests').once('value').then((snapshot) => {
          const requests = [];

          snapshot.forEach((childSnapshot) => {
              requests.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
              });
          });

          dispatch(setRequests(requests));
      });  
    };
};
