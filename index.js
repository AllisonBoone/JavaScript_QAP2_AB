const express = require('express');
const session = require('express-session');
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

app.use(
  session({
    secret: 'quiz-secret',
    resave: false,
    saveUninitialized: true,
  })
);

//Some routes required for full functionality are missing here. Only get routes should be required
app.get('/', (req, res) => {
  const lastStreak = req.session.streak || 'No streak recorded';
  res.render('index', { lastStreak });
});

app.get('/quiz', (req, res) => {
  const questionObject = getQuestion();
  req.session.currentQuestion = questionObject.question;
  req.session.correctAnswer = questionObject.answer;
  res.render('quiz', { question: questionObject.question });
});

//Handles quiz submissions.
app.post('/quiz', (req, res) => {
  const userAnswer = parseFloat(req.answer);
  const isCorrect = isCorrectAnswer(req.session.currentQuestion, userAnswer);

  if (isCorrect) {
    req.session.streak = (req.session.streak || 0) + 1;
    res.redirect('/quiz-complete');
  } else {
    req.session.streak = 0;
    res.redirect('/quiz-complete');
  }
  console.log(`Answer: ${answer}`);

  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
  //By default we'll just redirect to the homepage again.
  //   res.redirect('/');
});

app.get('/quiz-complete', (req, res) => {
  const streak = req.session.streak;
  res.render('quiz-complete', { streak });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
