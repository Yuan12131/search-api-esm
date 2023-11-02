// express 모듈 설치
import express from 'express';
// 라우팅 핸들러 가져오기
import { handleSearchRequest, handleRootRequest } from './routes.js';

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', handleRootRequest);

app.get('/search/news', handleSearchRequest);

app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}`);
});
