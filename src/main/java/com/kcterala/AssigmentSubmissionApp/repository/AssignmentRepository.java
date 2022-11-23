package com.kcterala.AssigmentSubmissionApp.repository;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
}
