package com.bookmanager.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookmanager.backend.model.User;
import com.bookmanager.backend.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user){

        if(userRepository.existsByUsername(user.getUsername())){
            return null;
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public User authenticate(String username, String password){
        User user = userRepository.findByUsername(username).orElse(null);

        if(user == null){
            return null;
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            return null;
        }

        return user;
    }
}
