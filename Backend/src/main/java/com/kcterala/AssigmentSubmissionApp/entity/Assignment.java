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

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne
    private User codeReviewer;

}
