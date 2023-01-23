package com.kcterala.AssigmentSubmissionApp.model;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentEnum;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentStatusEnum;

public class AssignmentResponse {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();

    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentEnum[] getAssignmentEnum() {
        return assignmentEnums;
    }


    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }

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
