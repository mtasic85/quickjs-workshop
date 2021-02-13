import { popen } from 'std';

export default function fetch(resource, init) {
    init = init || {
        method: 'GET',
        headers: null,
        body: null,
    };
    
    let spErr = {};
    let curlCmd = `curl -s -X${init.method} "${resource}"`;

    if (init.headers != null) {
        curlCmd = `${curlCmd} ${Object.entries(init.headers).map(n => `-H '${n[0]}: ${n[1]}'`).join(' ')}`
    }

    if (init.method != 'GET') {
        curlCmd = `${curlCmd} -d '${init.body}'`
    }

    // console.log(curlCmd);
    let sp = popen(curlCmd, 'r', spErr);
    let curlOutput = sp.readAsString();
    let responseUrl = resource;
    let responseHeaders = {};
    let responseOk = true;
    let responseStatus = 200;

    let p = new Promise((resolve, reject) => {
        let response = {
            headers: responseHeaders,
            ok: responseOk,
            url: responseUrl,
            json: () => JSON.parse(curlOutput),
            text: () => curlOutput,
        };

        resolve(response);
    });

    return p;
};
