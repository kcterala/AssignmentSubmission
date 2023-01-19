package com.kcterala.AssigmentSubmissionApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;

    @Column(columnDefinition = "TEXT")
    private String text;

    @JsonIgnore
    @ManyToOne
    private Assignment assignment;
}
