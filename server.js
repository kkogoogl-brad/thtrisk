const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // 프론트엔드 웹 앱의 접속 허용
app.use(express.json()); // JSON 데이터 파싱



const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);






// 1단계에서 복사한 본인의 MongoDB 주소로 변경 (아이디/비번 입력)
const MONGO_URI = "mongodb+srv://kkogoogl_db_user:niriscxSII1YMr6I@cluster0.yxfm46y.mongodb.net/appName?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공!"))
  .catch(err => console.error("MongoDB 연결 실패:", err));

// 데이터 구조(스키마) 정의 - 예: AI 대화 기록 저장
const ChatLogSchema = new mongoose.Schema({
  prompt: String,
  response: String,
  createdAt: { type: Date, default: Date.now }
});
const ChatLog = mongoose.model('ChatLog', ChatLogSchema);

// ① 데이터 저장 API (기존 addDoc 대체)
app.post('/api/chats', async (req, res) => {
  try {
    const newChat = new ChatLog(req.body);
    const saved = await newChat.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ② 데이터 목록 조회 API (기존 getDocs 대체)
app.get('/api/chats', async (req, res) => {
  try {
    const list = await ChatLog.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
});