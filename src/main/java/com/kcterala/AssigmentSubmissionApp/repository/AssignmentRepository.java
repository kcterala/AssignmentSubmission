package com.kcterala.AssigmentSubmissionApp.repository;

import com.kcterala.AssigmentSubmissionApp.entity.Assignment;
import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);

    @Query("Select a from Assignment a where (a.status = 'SUBMITTED' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer)) or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(@Param("codeReviewer") User codeReviewer);
}
