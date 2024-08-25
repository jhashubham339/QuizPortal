package com.QuizPortalServer.QuizPortalServer.controller;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    //Note : Use any, In general, using ResponseEntity is considered a more standard and flexible approach
//    @PostMapping("/category")
//    public Category addCategory(@RequestBody Category category){
//        return this.categoryService.addCategory(category);
//    }
//
    @PostMapping("/category")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.addCategory(category));
    }

    //    @GetMapping("/category")
//    public List<Category> getCategory(){
//        return this.categoryService.getCategory();
//    }

    @GetMapping("/category")
    public ResponseEntity<?> getCategory(){
        return ResponseEntity.ok(this.categoryService.getCategory());
    }
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Category>getCategoryById(@PathVariable long categoryId){
        return ResponseEntity.ok(this.categoryService.getCategoryById(categoryId));
    }
    @PutMapping("/category")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.updateCategory(category));
    }
    @DeleteMapping("/category/{categoryId}")
    public void deleteCategory(@PathVariable long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }
}
