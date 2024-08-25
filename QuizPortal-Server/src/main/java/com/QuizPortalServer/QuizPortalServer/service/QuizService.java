package com.QuizPortalServer.QuizPortalServer.service;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;

import java.util.List;

public interface QuizService {
    public Quiz AddQuiz(Quiz quiz);
    public List<Quiz> getQuiz();
    public Quiz getQuizById(long quizId);
    public Quiz updateQuiz(Quiz quiz);
    public void deleteQuiz(Long quizId);
    public List<Quiz> getQuizzesOfCategory(Category category);
    public List<Quiz> getActiveQuizzes();
    public List<Quiz> getActiveQuizzesOfCategory(Category category);
}
