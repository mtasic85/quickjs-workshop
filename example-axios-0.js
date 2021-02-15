import fetch from './fetch.js';
import redaxios from './redaxios.js';

const axios = redaxios.create({ fetch, responseType: 'json' });

const id = Math.random() * 1000000 | 0;

axios.post('http://localhost:3000/posts', { 'id': id, 'value': id + '0' })
  .then(res => res.data)
  .then(data => {
    console.log('data[0]: ' + JSON.stringify(data));

    return axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log('data[1]: ' + JSON.stringify(data));
      });
  })
  .catch(err => {
    console.log('err: ' + JSON.stringify(err));
    console.log(err.stack);
  });
