package com.QuizPortalServer.QuizPortalServer;

import com.QuizPortalServer.QuizPortalServer.model.Role;
import com.QuizPortalServer.QuizPortalServer.model.User;
import com.QuizPortalServer.QuizPortalServer.model.UserRole;
import com.QuizPortalServer.QuizPortalServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class QuizPortalServerApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(QuizPortalServerApplication.class, args);
		System.out.println("Code Started...");
	}

	@Override
	public void run(String... args) throws Exception {
//		User user = new User();
//		user.setFirstName("Shubham");
//		user.setLastName("Kumar Jha");
//		user.setUserName("jhashubham339");
//		user.setPassword(this.bCryptPasswordEncoder.encode("shubham"));
//		user.setEmail("jhashubham339@gmail.com");
//		user.setPhone("9873424243");
//		user.setProfile("shubham.png");
//
//		Role role = new Role();
//		role.setRoleId(10L);
//		role.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role);
//		userRole.setUser(user);
//
//		userRoleSet.add(userRole);
//
//		User user1 = this.userService.createUser(user,userRoleSet);
//    	System.out.println(user1.getUserName());
	}
}
