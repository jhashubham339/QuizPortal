package com.QuizPortalServer.QuizPortalServer.service;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;

import java.util.List;

public interface CategoryService {
    public Category addCategory(Category category);
    public List<Category> getCategory();
    public Category getCategoryById(long categoryId);
    public Category updateCategory(Category category);
    public void deleteCategory(long categoryId);
}
