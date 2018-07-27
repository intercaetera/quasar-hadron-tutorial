import axios from 'axios';

export default {
  user: null,
  getUser() {
    return this.user;
  },
  loggedIn() {
    return this.user !== null;
  },
  authorize(token) {
    return axios.get('/user/authorize', {
      headers: {
        Authorization: token,
      },
    }).then(res => {
      localStorage.setItem('Authorization', `Bearer: ${res.data.token}`);
      this.user = res.data;
      return null;
    }).catch(err => console.log(token, err));
  },
  login(name, password) {
    return axios.post('/user/login', { name, password }).then(res => {
      localStorage.setItem('Authorization', `Bearer: ${res.data.token}`);
      this.user = res.data;
      return null;
    }).catch(error => error.response.data.error);
  },
  register(name, password) {
    return axios.post('/user/create', { name, password }).then(res => {
      localStorage.setItem('Authorization', `Bearer: ${res.data.token}`);
      this.user = res.data;
      return null;
    }).catch(error => error.response.data.error);
  },
  logout() {
    localStorage.removeItem('Authorization');
    this.user = null;
  },
};
