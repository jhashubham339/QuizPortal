package com.QuizPortalServer.QuizPortalServer.repo;

import com.QuizPortalServer.QuizPortalServer.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
