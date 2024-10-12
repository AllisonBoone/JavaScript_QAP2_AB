/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */
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

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  const [num1, operator, num2] = question.split(' ');
  let correctAnswer;

  switch (operator) {
    case '+':
      correctAnswer = parseInt(num1) + parseInt(num2);
      break;
    case '-':
      correctAnswer = parseInt(num1) - parseInt(num2);
      break;
    case '*':
      correctAnswer = parseInt(num1) * parseInt(num2);
      break;
    case '/':
      correctAnswer = parseInt(num1) / parseInt(num2);
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
