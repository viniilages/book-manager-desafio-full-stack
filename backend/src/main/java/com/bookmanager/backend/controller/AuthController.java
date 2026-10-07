package com.bookmanager.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmanager.backend.dto.RegisterRequest;
import com.bookmanager.backend.dto.UserResponse;
import com.bookmanager.backend.model.User;
import com.bookmanager.backend.service.JwtService;
import com.bookmanager.backend.service.UserService;
import com.bookmanager.backend.dto.LoginRequest;
import com.bookmanager.backend.service.JwtService;
import com.bookmanager.backend.dto.LoginResponse;


import jakarta.validation.Valid;

@RestController 
@RequestMapping("/auth")
public class AuthController {   
    
    private final UserService userService;
    private final JwtService jwtService;

    AuthController(UserService userService, JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        
        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());

        User savedUser = userService.register(user);

        if(savedUser == null){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        UserResponse response = new UserResponse(savedUser.getId(), savedUser.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){

        User user = userService.authenticate(request.getUsername(), request.getPassword());

        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = jwtService.generateToken(user.getUsername());

        LoginResponse response = new LoginResponse(token);

        return ResponseEntity.ok(response);
    }
    
}
