package com.kcterala.AssigmentSubmissionApp.model;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentEnum;

public class AssignmentResponse {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnum = AssignmentEnum.values();

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentResponse(Assignment assignment) {
        this.assignment = assignment;
    }
}
