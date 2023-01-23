package com.kcterala.AssigmentSubmissionApp.service;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentStatusEnum;
import com.kcterala.AssigmentSubmissionApp.enums.AuthorityEnum;
import com.kcterala.AssigmentSubmissionApp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;
    public Assignment createAssignment(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setUser(user);
        assignment.setNumber(findNextAssignmentToSubmit(user));
        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user);
        if(assignmentsByUser == null){
            return 1;
        }
        Optional<Integer> nextAssigmentNumOpt = assignmentsByUser.stream().sorted((a1, a2) -> {
            if(a1.getNumber() == null) return 1;
            if(a2.getNumber() == null) return 1;
            return a2.getNumber().compareTo(a1.getNumber());
        }).map(assignment -> {
            if(assignment.getNumber() == null) return 1;
            return assignment.getNumber() + 1;
        }
        ).findFirst();

        return nextAssigmentNumOpt.orElse(1);
    }

    public Set<Assignment> getAssignments(User user) {
        boolean isCodeReviewer = user.getAuthorities().stream().filter(auth-> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority())).count() > 0;
        if(isCodeReviewer){
            return assignmentRepository.findByCodeReviewer(user);
        }
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
