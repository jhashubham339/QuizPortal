package com.QuizPortalServer.QuizPortalServer.controller;

import com.QuizPortalServer.QuizPortalServer.model.Role;
import com.QuizPortalServer.QuizPortalServer.model.User;
import com.QuizPortalServer.QuizPortalServer.model.UserRole;
import com.QuizPortalServer.QuizPortalServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.ref.Reference;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/users")
    public User createUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");
        user.setPassword(user.getPassword());
        Set<UserRole> userRoles= new HashSet<>();
        Role role = new Role();
        role.setRoleId(11L);
        role.setRoleName("NORMAL");

        UserRole userRole =new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoles.add(userRole);
        return this.userService.createUser(user,userRoles);
    }
    @GetMapping("/users")
    public List<User> getUsers(){
        return this.userService.getAlUsers();
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable long id){
        return this.userService.getUserById(id);
    }
    @PutMapping("/users")
    public User updateUser(@RequestBody User user){
        return this.userService.updateUser(user);
    }
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable long id){
        this.userService.deleteUser(id);
    }
}
