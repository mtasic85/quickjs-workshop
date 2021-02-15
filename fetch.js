import { popen } from 'std';

function fetchPollyfil(resource, init) {
  init = init || {
    method: 'GET',
    headers: null,
    body: null,
  };
  
  let curlCmd = `curl -s -X${init.method} "${resource}"`;

  if (init.headers != null) {
    curlCmd = `${curlCmd} ${Object.entries(init.headers).map(n => `-H '${n[0]}: ${n[1]}'`).join(' ')}`
  }

  if (init.method != 'GET') {
    curlCmd = `${curlCmd} -d '${init.body}'`
  }

  const spErr = {};
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
      text: () => curlOutput,
      json: () => JSON.parse(curlOutput),
    };

    resolve(response);
  });

  return p;
}

globalThis.fetch = fetchPollyfil;

export default fetchPollyfil;
