import { fetchRequest } from 'Services';
import { User } from 'Types';

function checkUser(user: User) {
  if (user.authenticated) {
    return fetchRequest('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }
}

const UserAPI = {
  checkUser
}

export default  UserAPI;