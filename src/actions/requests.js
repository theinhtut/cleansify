import uuid from 'uuid';

// ADD_REQUEST
export const addRequest = (
    {
        email = '',
        location = '',
        date = 0
    } = {}
    ) => ({
  type: 'ADD_REQUEST',
  request: {
    id: uuid(),
    email,
    location,
    date
  }
});
