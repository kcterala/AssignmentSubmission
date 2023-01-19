package com.kcterala.AssigmentSubmissionApp.service;

import com.kcterala.AssigmentSubmissionApp.entity.Comment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.model.CommentDto;
import com.kcterala.AssigmentSubmissionApp.repository.AssignmentRepository;
import com.kcterala.AssigmentSubmissionApp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private AssignmentRepository assignmentRepo;

    public Comment save(CommentDto commentdto, User user) {
        Comment comment = new Comment();
        comment.setText(commentdto.getText());
        comment.setCreatedBy(user);
        comment.setAssignment(assignmentRepo.getById(commentdto.getAssignmentId()));
        comment.setCreatedDate(LocalDateTime.now());

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        return commentRepo.findByAssignmentId(assignmentId);
    }
}
