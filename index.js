const express = require('express');
const session = require('express-session');
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  session({
    secret: 'quiz-secret',
    resave: false,
    saveUninitialized: true,
  })
);

let leaderboards = [];

app.get('/', (req, res) => {
  const lastStreak = req.session.streak || 'No streak recorded';
  res.render('index', { lastStreak });
});

app.get('/quiz', (req, res) => {
  const questionObject = getQuestion();
  req.session.currentQuestion = questionObject.question;
  req.session.correctAnswer = questionObject.answer;
  res.render('quiz', {
    question: questionObject.question,
    streak: req.session.streak,
  });
});

app.post('/quiz', (req, res) => {
  const userAnswer = parseFloat(req.body.answer);
  const isCorrect = isCorrectAnswer(req.session.currentQuestion, userAnswer);

  if (isCorrect) {
    req.session.streak = (req.session.streak || 0) + 1;
  } else {
    if (req.session.streak > 0) {
      leaderboards.push({
        streak: req.session.streak,
        correctAnswers: req.session.streak,
        date: new Date(),
      });
    }
    req.session.streak = 0;
  }
  res.redirect('/quiz-complete');
  console.log(`Answer: ${userAnswer}`);
});

app.get('/quiz-complete', (req, res) => {
  const streak = req.session.streak;
  res.render('quiz-complete', { streak });
});

app.get('/leaderboard', (req, res) => {
  const topLeaderboards = leaderboards
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 10);
  res.render('leaderboard', { leaderboards: topLeaderboards });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
