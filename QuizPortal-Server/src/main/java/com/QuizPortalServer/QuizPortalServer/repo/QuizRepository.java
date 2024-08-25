package com.QuizPortalServer.QuizPortalServer.repo;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
    public List<Quiz> findBycategory(Category category);
    public List<Quiz> findByActive(Boolean bool);
    public List<Quiz> findByCategoryAndActive(Category category,Boolean bool);
}
