package com.QuizPortalServer.QuizPortalServer.controller;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Category;
import com.QuizPortalServer.QuizPortalServer.model.quiz.Quiz;
import com.QuizPortalServer.QuizPortalServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;
    @PostMapping("/quiz")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.AddQuiz(quiz));
    }
    @GetMapping("/quiz")
    public ResponseEntity<?> getQuiz(){
        return ResponseEntity.ok(this.quizService.getQuiz());
    }
//    @GetMapping("/quiz/{quizId}")
//    public ResponseEntity<Quiz> getQuizById(@PathVariable long quizId){
//        return ResponseEntity.ok(this.quizService.getQuizById(quizId));
//    }
    @GetMapping("/quiz/{quizId}")
    public  Quiz getQuizById(@PathVariable long quizId){
    return this.quizService.getQuizById(quizId);
    }
    @PutMapping("/quiz")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }
    @DeleteMapping("/quiz/{quizId}")
    public void deleteQuiz(@PathVariable long quizId){
        this.quizService.deleteQuiz(quizId);
    }
    // get Quizzes Of Category
    @GetMapping("/quiz/category/{categoryId}")
    public List<Quiz> getQuizOfCategory(@PathVariable long categoryId){
        Category category = new Category();
        category.setcId(categoryId);
        return this.quizService.getQuizzesOfCategory(category);
    }

    //get active quiz
    @GetMapping("/quiz/active")
    public List<Quiz> getActive(){
        return this.quizService.getActiveQuizzes();
    }

    // get Active Quizzes Of Category
    @GetMapping("/quiz/category/active/{categoryId}")
    public List<Quiz> getActiveQuizCategory(@PathVariable long categoryId){
        Category category = new Category();
        category.setcId(categoryId);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }
}
