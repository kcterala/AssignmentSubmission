package com.kcterala.AssigmentSubmissionApp.controller;

import com.kcterala.AssigmentSubmissionApp.entity.Comment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.model.CommentDto;
import com.kcterala.AssigmentSubmissionApp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(exposedHeaders = {"Authorization"})
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto comment, @AuthenticationPrincipal User user){
        System.out.println(comment);
        Comment comment1 = commentService.save(comment, user);
        return ResponseEntity.ok(comment1);
    }

    @GetMapping
    public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long assignmentId){
        Set<Comment> commentsList = commentService.getCommentsByAssignmentId(assignmentId);
        System.out.println(commentsList);
        return ResponseEntity.ok(commentsList);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto comment, @AuthenticationPrincipal User user){
        System.out.println(comment);
        Comment comment1 = commentService.save(comment, user);
        return ResponseEntity.ok(comment1);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment (@PathVariable Long commentId) {
        try {
            commentService.delete(commentId);
            return ResponseEntity.ok("Comment deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
