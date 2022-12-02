package com.kcterala.AssigmentSubmissionApp.enums;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentEnumDto {
    private String assignmentName;
    private Integer assignmentNum;

}
