function getQuestion() {
  const operations = ['+', '-', '*', '/'];
  const randomOperations =
    operations[Math.floor(Math.random() * operations.length)];
  const num1 = Math.floor(Math.random() * 100);
  const num2 = Math.floor(Math.random() * 100);

  let answer;
  switch (randomOperations) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = num2 !== 0 ? num1 / num2 : 0;
      break;
  }

  const question = `${num1} ${randomOperations} ${num2}`;
  return { question, answer };
}

function isCorrectAnswer(question, answer) {
  const [num1, operator, num2] = question.split(' ');
  let correctAnswer;

  switch (operator) {
    case '+':
      correctAnswer = parseFloat(num1) + parseFloat(num2);
      break;
    case '-':
      correctAnswer = parseFloat(num1) - parseFloat(num2);
      break;
    case '*':
      correctAnswer = parseFloat(num1) * parseFloat(num2);
      break;
    case '/':
      correctAnswer = parseFloat(num1) / parseFloat(num2);
      break;
  }

  return (
    Math.round(correctAnswer * 100) / 100 === Math.round(answer * 100) / 100
  );
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
