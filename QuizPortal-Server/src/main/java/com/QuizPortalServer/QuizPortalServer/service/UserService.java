package com.QuizPortalServer.QuizPortalServer.service;

import com.QuizPortalServer.QuizPortalServer.model.User;
import com.QuizPortalServer.QuizPortalServer.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {
    public User createUser(User user , Set<UserRole> userRoles) throws Exception;
    public List<User> getAlUsers();
    public User getUserById(long id);
    public User updateUser(User user);
    public void deleteUser(long id);
}
