package com.kcterala.AssigmentSubmissionApp.controller;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.enums.AuthorityEnum;
import com.kcterala.AssigmentSubmissionApp.model.AssignmentResponse;
import com.kcterala.AssigmentSubmissionApp.service.AssignmentService;
import com.kcterala.AssigmentSubmissionApp.service.UserService;
import com.kcterala.AssigmentSubmissionApp.util.AuthorityUtil;
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
    private UserService userService;
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
        AssignmentResponse assignmentResponse = new AssignmentResponse(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(assignmentResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAssignmentById(@PathVariable long id,@RequestBody Assignment assignment, @AuthenticationPrincipal User user){
        if(assignment.getCodeReviewer() != null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUserName(codeReviewer.getUsername()).orElse(new User());

            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
                System.out.println("Coming hereeee");
            }
        }
        Assignment updateAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updateAssignment);
    }
}
