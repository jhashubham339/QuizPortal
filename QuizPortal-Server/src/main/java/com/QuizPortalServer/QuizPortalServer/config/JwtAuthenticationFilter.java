package com.QuizPortalServer.QuizPortalServer.config;

import com.QuizPortalServer.QuizPortalServer.service.impl.CustomUserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Authorization
        String requestHeader = request.getHeader("Authorization");
        //loger using for ...logger.info(" Header :  {}", requestHeader);
        logger.info(" Header :  {}",requestHeader);
        String username =null;
        String token =null;
        if(requestHeader !=null && requestHeader.startsWith("Bearer ")){
            // if yes
            token = requestHeader.substring(7);
            try {
                username = this.jwtUtil.getUsernameFromToken(token);
            }catch (IllegalArgumentException e){
                logger.info("Illegal Argument while fetching the username !!");
                e.printStackTrace();
            }catch (ExpiredJwtException e){
                logger.info("Given jwt token is expired !!");
                e.printStackTrace();
            }catch (MalformedJwtException e){
                logger.info("Some changed has done in token !! Invalid Token");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }else{
            //else No
            logger.info("Invalid Header Value !! ");
        }
        //Once will get the token will validate the token
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            //fetch user detail from username
            UserDetails userDetails = this.customUserDetailsServiceImpl.loadUserByUsername(username);

            if(this.jwtUtil.validateToken(token, userDetails)){
                //Token is valid
                //set the authentication
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }else{
                //validation is failed
                logger.info("Token is not valid !!");
            }
        }
        filterChain.doFilter(request,response);
    }
}
