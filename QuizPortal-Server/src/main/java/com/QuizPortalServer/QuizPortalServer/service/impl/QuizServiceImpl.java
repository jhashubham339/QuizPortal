package com.QuizPortalServer.QuizPortalServer.service.impl;

import com.QuizPortalServer.QuizPortalServer.exception.QuizNotFoundException;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;
import com.QuizPortalServer.QuizPortalServer.repo.QuizRepository;
import com.QuizPortalServer.QuizPortalServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Override
    public Quiz AddQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getQuiz() {
        return this.quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(long quizId) throws QuizNotFoundException {
        try {
            return this.quizRepository.findById(quizId).get();
        }catch (Exception ex){
            throw new QuizNotFoundException("Quiz not found with id : " +quizId);
        }
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long quizId) throws QuizNotFoundException{
        try {
            this.quizRepository.deleteById(quizId);
        }catch (Exception ex){
            throw new QuizNotFoundException("Quiz not found with id : " +quizId);
        }
    }

    @Override
    public List<Quiz> getQuizzesOfCategory(Category category) {
        return this.quizRepository.findBycategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.quizRepository.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategoryAndActive(category,true);
    }
}
