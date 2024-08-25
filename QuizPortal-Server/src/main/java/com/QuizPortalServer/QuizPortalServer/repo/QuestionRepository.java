package com.QuizPortalServer.QuizPortalServer.repo;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Question;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz(Quiz quiz);
}
