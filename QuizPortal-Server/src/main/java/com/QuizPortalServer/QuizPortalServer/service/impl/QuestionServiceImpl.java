package com.QuizPortalServer.QuizPortalServer.service.impl;

import com.QuizPortalServer.QuizPortalServer.exception.QuestionNotFoundException;
import com.QuizPortalServer.QuizPortalServer.exception.QuizNotFoundException;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Question;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;
import com.QuizPortalServer.QuizPortalServer.repo.QuestionRepository;
import com.QuizPortalServer.QuizPortalServer.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestion() {
        return this.questionRepository.findAll();
    }

    @Override
    public Question getQuestionById(long questionId) throws QuestionNotFoundException {
        try {
            return this.questionRepository.findById(questionId).get();
        }catch (Exception ex) {
            throw new QuizNotFoundException("Question not found with id : " + questionId);
        }
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(long questionId) throws QuestionNotFoundException{
        try {
            this.questionRepository.deleteById(questionId);
        }catch (Exception ex){
            throw new QuestionNotFoundException("Question not found with id : " + questionId);
        }
    }

    @Override
    public List<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }
}
