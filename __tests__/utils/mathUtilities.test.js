const { isCorrectAnswer, getQuestion } = require('../../utils/mathUtilities');

describe('Test for getQuestion', () => {
  test('generate valid question with an answer', () => {
    const { question, answer } = getQuestion();
    expect(typeof question).toBe('string');
    expect(typeof answer).toBe('number');
  });
});

describe('Tests for isCorrectAnswer', () => {
  test('return true for correct answer', () => {
    const question = '1 + 1';
    const answer = 2;
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });
});
