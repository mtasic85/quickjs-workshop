import fetch from './fetch.js';

let id = Math.random() * 1000000 | 0;

fetch('http://localhost:3000/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'id': id, 'value': id + '0' }) })
    .then(data => {
        // console.log('data [text]:' + data.text());
        // console.log('data [json]:' + JSON.stringify(data.json()));
        return data.json();
    })
    .then(res => {
        console.log('res[0]: ' + JSON.stringify(res));

        return fetch(`http://localhost:3000/posts/${id}`)
            .then(data => {
                // console.log('data [text]:' + data.text());
                // console.log('data [json]:' + JSON.stringify(data.json()));
                return data.json();
            })
            .then(res => {
                console.log('res[1]: ' + JSON.stringify(res));
            })
            .catch(err => {
                console.log('err[1]: ' + JSON.stringify(err));
            });

    })
    .catch(err => {
        console.log('err[0]: ' + JSON.stringify(err));
    });
