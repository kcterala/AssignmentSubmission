package com.kcterala.AssigmentSubmissionApp.enums;

public enum AssignmentEnum {
    ASSIGNMENT_1(1, "HTML Assignment"),
    ASSIGNMENT_2(2, "Guessing Game"),
    ASSIGNMENT_3(3, "User Login"),
    ASSIGNMENT_4(4, "Student Course List"),
    ASSIGNMENT_5(5, "Custom Array List"),
    ASSIGNMENT_6(6, "Reports with Streams"),
    ASSIGNMENT_7(7, "Unit Testing"),
    ASSIGNMENT_8(8, "Multi-Threading"),
    ASSIGNMENT_9(9, "Spring MVC"),
    ASSIGNMENT_10(10, "Restful Services"),
    ASSIGNMENT_11(11, "Full Stack development"),
    ASSIGNMENT_12(12, "Chatting with 35");

    private Integer assignmentNum;
    private String assignmentName;

    AssignmentEnum(int assignmentNum, String assignmentName){
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }

    public Integer getAssignmentNum() {
        return assignmentNum;
    }

    public void setAssignmentNum(Integer assignmentNum) {
        this.assignmentNum = assignmentNum;
    }

    public String getAssignmentName() {
        return assignmentName;
    }

    public void setAssignmentName(String assignmentName) {
        this.assignmentName = assignmentName;
    }
}
