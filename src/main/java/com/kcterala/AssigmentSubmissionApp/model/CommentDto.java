package com.kcterala.AssigmentSubmissionApp.model;

import com.kcterala.AssigmentSubmissionApp.entity.User;
import lombok.Data;

@Data
public class CommentDto {
    private Long assignmentId;
    private String text;
    private String user;

}
