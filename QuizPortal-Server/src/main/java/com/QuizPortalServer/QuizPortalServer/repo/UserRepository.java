package com.QuizPortalServer.QuizPortalServer.repo;

import com.QuizPortalServer.QuizPortalServer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUserName(String username);
}
