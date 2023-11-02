import { client_id, client_secret } from './utils.js'; // 인증키 가져오기
import { createApiUrl } from './api.js'; // API URL 
import fetch from 'node-fetch'; // Node.js 환경에서 HTTP 요청을 수행하기 위해 사용되는 패키지인 node-fetch

export function handleSearchRequest(req, res) {
  const query = req.query.query;
  const api_url = createApiUrl(query);

  const options = {
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };

  fetch(api_url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('404 Not Found');
      }
      return response.json();
    })
    .then((data) => {
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(JSON.stringify(data)); // 데이터를 JSON형식으로 변환하고 응답
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export function handleRootRequest(req, res) {
  res.sendFile(__dirname + '../public/index.html');
}