package com.kcterala.AssigmentSubmissionApp.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer number;

    private String status;

    private String branch;

    private String githubUrl;
    private String codeReviewVideoUrl;

    @ManyToOne
    private User user;
//    private User assignedTo;

}
