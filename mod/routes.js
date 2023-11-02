import { createApiUrl } from './api.js';
import { client_id, client_secret } from './utils.js';

// 검색 요청 처리 함수
export function handleSearchRequest(req, res) {
  const query = req.query.query;
  const api_url = createApiUrl(query);

  const options = {
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };

  // 네트워크 요청과 응답을 수동으로 처리
  const https = require('https');
  https.get(api_url, options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(data);
    });
  });
}

// 루트 경로 요청 처리 함수
export function handleRootRequest(req, res) {
  const fs = require('fs');
  fs.readFile(__dirname + './public/index.html', (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}
