import { popen } from 'std';

function fetchPolyfill(resource, init) {
  init = init || {
    method: 'GET',
    headers: null,
    body: null,
  };
  
  let curlCmd = `curl -s -X${init.method.toUpperCase()} "${resource}"`;

  if (init.headers != null && Object.keys(init.headers).length > 0) {
    curlCmd = `${curlCmd} ${Object.entries(init.headers).map(n => `-H '${n[0]}: ${n[1]}'`).join(' ')}`
  }

  if (init.method != 'GET') {
    let body = init.body;
    
    if (typeof body != 'string') {
      body = JSON.stringify(body);
    }

    curlCmd = `${curlCmd} -d '${body}'`
  }

  const spErr = {};
  // console.log('curlCmd: ' + curlCmd);
  const sp = popen(curlCmd, 'r', spErr);
  const curlOutput = sp.readAsString();
  const responseUrl = resource;
  const responseHeaders = {};
  let responseOk = true;
  let responseStatus = 200;

  const p = new Promise((resolve, reject) => {
    const response = {
      headers: responseHeaders,
      ok: responseOk,
      url: responseUrl,
      type: 'json',
      text: () => curlOutput,
      json: () => JSON.parse(curlOutput),
    };

    resolve(response);
  });

  return p;
}

export default fetchPolyfill;
