package com.kcterala.AssigmentSubmissionApp.controller;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/assignments")
@CrossOrigin
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;


    @PostMapping
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
        Assignment newAssignment = assignmentService.createAssignment(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(assignmentService.getAssignments(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAssignmentById(@PathVariable long id, @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOpt = assignmentService.findById(id);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAssignmentById(@PathVariable long id,@RequestBody Assignment assignment, @AuthenticationPrincipal User user){
        Assignment updateAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updateAssignment);
    }
}
