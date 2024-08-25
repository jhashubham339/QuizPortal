package com.QuizPortalServer.QuizPortalServer.service;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Question;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;

import java.util.List;

public interface QuestionService {
    public Question addQuestion(Question question);
    public List<Question> getQuestion();
    public Question getQuestionById(long questionId);
    public Question updateQuestion(Question question);
    public void deleteQuestion(long questionId);
    public List<Question> getQuestionsOfQuiz(Quiz quiz);
}
