package com.QuizPortalServer.QuizPortalServer.repo;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
