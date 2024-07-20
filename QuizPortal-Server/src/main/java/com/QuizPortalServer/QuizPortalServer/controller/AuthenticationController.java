package com.QuizPortalServer.QuizPortalServer.controller;

import com.QuizPortalServer.QuizPortalServer.config.JwtUtil;
import com.QuizPortalServer.QuizPortalServer.model.JwtRequest;
import com.QuizPortalServer.QuizPortalServer.model.JwtResponse;
import com.QuizPortalServer.QuizPortalServer.model.User;
import com.QuizPortalServer.QuizPortalServer.service.impl.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
    @Autowired
    private JwtUtil jwtUtil;

    //Generate token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            this.doAuthenticate(jwtRequest.getUsername(),jwtRequest.getPassword());

        }catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("User not found !!");
        }
        //Authenticate-------
        UserDetails userDetails = customUserDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void doAuthenticate(String username ,String password) throws Exception {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authenticationToken); //authenticate the username and password to generate the token
        }catch (BadCredentialsException e){
            throw new Exception("Invalid Username or Password !!" + e.getMessage());
        }
    }

    //Returns the details of the current users who logged in ...
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        //(User) -->Type cast
        return (User) this.customUserDetailsServiceImpl.loadUserByUsername(principal.getName());
    }
}
