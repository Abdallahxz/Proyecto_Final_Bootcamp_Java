package com.example.userauthapi.service;

import com.example.userauthapi.dtos.LoginRequest;
import com.example.userauthapi.dtos.changePasswordRequest;
import com.example.userauthapi.entity.User;
import com.example.userauthapi.repository.UserRepository;
import com.example.userauthapi.utils.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Register new User
    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            response.put("success", false);
            response.put("message", "User already exists");
            response.put("errorCode", HttpStatus.CONFLICT.value());
            return response;
        }

        userRepository.save(user);
        response.put("success", true);
        response.put("message", "Registration successful!");
        response.put("errorCode", HttpStatus.CREATED.value());
        return response;
    }

    // Login User
    public Map<String, Object> loginUser(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> existingUser = userRepository.findByEmail(loginRequest.getEmail());

        if (existingUser.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), existingUser.get().getPassword())) {
            String token = jwtTokenProvider.createToken(loginRequest.getEmail());

            response.put("success", true);
            response.put("message", "Successfully logged in.");
            response.put("token", token);
            response.put("code", HttpStatus.ACCEPTED.value());
        } else {
            response.put("success", false);
            response.put("message", "Invalid email or password.");
            response.put("code", HttpStatus.UNAUTHORIZED.value());
        }

        return response;
    }

    public Map<String, Object> getUserDetails(String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            // create custom  user object
            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("first_name", user.getName());
            userDetails.put("last_name", user.getLastName());
            userDetails.put("email", user.getEmail());
            userDetails.put("age", user.getAge());

            // create response
            response.put("success", true);
            response.put("user", userDetails);
            response.put("code", HttpStatus.ACCEPTED.value());
        }
        else {
            response.put("success", false);
            response.put("message", "User not found.");
            response.put("code", HttpStatus.NOT_FOUND.value());
        }

        return response;
    }

    public Map<String, Object> updateUserPassword(String email, changePasswordRequest passwordRequest) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()&& passwordEncoder.matches( passwordRequest.getOldPassword(), existingUser.get().getPassword()) ) {
            existingUser.get().setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
            userRepository.save(existingUser.get());
            response.put("success", true);
            response.put("message", "Password changed successfully.");
            response.put("code", HttpStatus.ACCEPTED.value());
        }
        else {
            response.put("success", false);
            response.put("message", "updating password failed ... please try again.");
            response.put("code", HttpStatus.NOT_FOUND.value());

        }
        return response;
    }
}
