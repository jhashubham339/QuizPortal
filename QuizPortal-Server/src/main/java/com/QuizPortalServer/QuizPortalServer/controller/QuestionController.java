package com.QuizPortalServer.QuizPortalServer.controller;

import com.QuizPortalServer.QuizPortalServer.model.quiz.Question;
import com.QuizPortalServer.QuizPortalServer.service.QuestionService;
import com.QuizPortalServer.QuizPortalServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;
    @PostMapping("/question")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }
    @GetMapping("/question")
    public ResponseEntity<?> getQuestion(){
        return ResponseEntity.ok(this.questionService.getQuestion());
    }
    @GetMapping("/question/{questionId}")
    public ResponseEntity<?> getQuestionById(@PathVariable long questionId){
        return ResponseEntity.ok(this.questionService.getQuestionById(questionId));
    }
    @PutMapping("/question")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //delete question
    @DeleteMapping("/question/{questionId}")
    public void deleteQuestion(@PathVariable long questionId){
        this.questionService.deleteQuestion(questionId);
    }
}
