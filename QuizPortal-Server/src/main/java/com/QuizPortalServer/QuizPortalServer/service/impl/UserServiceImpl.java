package com.QuizPortalServer.QuizPortalServer.service.impl;

import com.QuizPortalServer.QuizPortalServer.exception.UserNotFoundException;
import com.QuizPortalServer.QuizPortalServer.model.User;
import com.QuizPortalServer.QuizPortalServer.model.UserRole;
import com.QuizPortalServer.QuizPortalServer.repo.RoleRepository;
import com.QuizPortalServer.QuizPortalServer.repo.UserRepository;
import com.QuizPortalServer.QuizPortalServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws UserNotFoundException {
        try {
            User local = this.userRepository.findByUserName(user.getUserName());
            if (local != null) {
                throw new UserNotFoundException("User already exist!!");
            } else {
                //create the user
                for (UserRole ur : userRoles) {
                    roleRepository.save(ur.getRole());
                }
                user.getUserRoles().addAll(userRoles);
                local = this.userRepository.save(user);

            }
            return local;
        }catch (Exception e){
            throw new UserNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<User> getAlUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User getUserById(long id) throws UserNotFoundException{
        try{
            return this.userRepository.findById(id).get();
        }catch (Exception ex){
            throw new UserNotFoundException("User not found with id : " +id);
        }
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        this.userRepository.deleteById(id);
    }
}
