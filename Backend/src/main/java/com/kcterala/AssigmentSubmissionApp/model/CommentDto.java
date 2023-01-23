package com.kcterala.AssigmentSubmissionApp.model;

import com.kcterala.AssigmentSubmissionApp.entity.User;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CommentDto {
    private Long id;
    private Long assignmentId;
    private String text;
    private String user;
    private ZonedDateTime createdDate;
}
