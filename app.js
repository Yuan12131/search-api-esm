import express from 'express';
import https from 'https'; // 안전한 요청을 위해 'https'를 사용

const client_id = '9e_Z7STmxYIcQkv6gSSD';
const client_secret = 'WFiNunUoAn';

const port = 8080; // 포트 번호

const app = express();

// 정적 파일 제공
app.use(express.static('public'));

// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// '/search/news'로의 GET 요청 처리
app.get('/search/news', (req, res) => {
  // 요청의 쿼리 매개변수에서 검색어 가져오기
    // 요청의 쿼리 매개변수에서 검색어 가져오기
    const query = req.query.query;

    // 네이버 뉴스 API의 엔드포인트 URL을 생성
    const api_url = `https://openapi.naver.com/v1/search/news?query=${encodeURI(query)}`;
  
    // API 요청 옵션 설정
    const options = {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    };
  
    // 'https' 모듈을 사용하여 네이버 API에 GET 요청 보내기
    https.get(api_url, options, response => {
      let data = '';
  
      // API에서 전달한 응답 데이터를 조각조각 도착할 때마다 data 변수에 추가
      response.on('data', chunk => {
        data += chunk;
      });
  
      // API 응답을 모두 받은 후(모든 데이터 수신)에는 클라이언트에게 상태 코드 200과 함께 JSON 형식의 응답 전송
      response.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
        res.end(data);
      });
    });
  });
  
  // 서버 시작
  app.listen(port, () => {
    console.log(`서버가 http://127.0.0.1:${port}에서 실행 중입니다.`);
  });
  
