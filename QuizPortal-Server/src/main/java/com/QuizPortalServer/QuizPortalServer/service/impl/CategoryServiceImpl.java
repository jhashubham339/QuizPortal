package com.QuizPortalServer.QuizPortalServer.service.impl;

import com.QuizPortalServer.QuizPortalServer.exception.CategoryNotFoundException;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.repo.CategoryRepository;
import com.QuizPortalServer.QuizPortalServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }
    @Override
    public List<Category> getCategory() {
        return this.categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long categoryId) throws CategoryNotFoundException {
        try {
            return this.categoryRepository.findById(categoryId).get();
        }catch (Exception ex){
            throw new CategoryNotFoundException("Category not found with id : " +categoryId);
        }

    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(long categoryId) throws CategoryNotFoundException{
        try {
            this.categoryRepository.deleteById(categoryId);
        }catch (Exception ex){
            throw new CategoryNotFoundException("Category not found with id : " +categoryId);
        }
    }
}
