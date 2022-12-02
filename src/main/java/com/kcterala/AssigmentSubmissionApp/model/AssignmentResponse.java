package com.kcterala.AssigmentSubmissionApp.model;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentEnum;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentEnumDto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponse {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();

    public AssignmentEnum[] getAssignmentEnum() {
        return assignmentEnums;
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
