export type CodeFunction<T> = (
  url: string,
  method: string,
  params: string[]
) => T;

export type CodeExample = {
  name: string;
  getCode: CodeFunction<string>;
  language: string;
  run?: CodeFunction<Promise<Record<string, unknown>>>;
};

export const Curl: CodeExample = {
  name: "CURL",
  getCode: (url, method, params = []) => `curl --request POST \\
     --url ${url} \\
     --header 'accept: application/json' \\
     --header 'content-type: application/json' \\
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "params": ${JSON.stringify(params)},
  "method": "${method}"
}'`,
  language: "javascript",
  run: (url, method, params) => {
    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        params,
        method,
      }),
    }).then((res) => res.json());
  },
};

export default [Curl];
