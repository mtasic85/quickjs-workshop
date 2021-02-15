import fetch from './fetch.js';

let id = Math.random() * 1000000 | 0;

fetch('http://localhost:3000/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'id': id, 'value': id + '0' }) })
  .then(res => res.json())
  .then(data => {
    console.log('data[0]: ' + JSON.stringify(data));

    return fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('data[1]: ' + JSON.stringify(data));
      });
  })
  .catch(err => {
    console.log('err: ' + JSON.stringify(err));
    console.log(err.stack);
  });
