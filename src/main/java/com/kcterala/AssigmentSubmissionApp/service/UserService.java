package com.kcterala.AssigmentSubmissionApp.service;

import com.kcterala.AssigmentSubmissionApp.entity.User;
import com.kcterala.AssigmentSubmissionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public Optional<User> findUserByUserName(String username){
        return userRepository.findByUsername(username);
    }
}
