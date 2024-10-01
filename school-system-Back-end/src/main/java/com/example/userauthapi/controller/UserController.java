package com.example.userauthapi.controller;

import com.example.userauthapi.dtos.LoginRequest;
import com.example.userauthapi.dtos.changePasswordRequest;
import com.example.userauthapi.entity.User;
import com.example.userauthapi.service.UserService;
import com.example.userauthapi.utils.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Verify data
            String validationError = validateUserData(user);
            if (validationError != null) {
                response.put("success", false);
                response.put("message", validationError);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400 Bad Request
            }

            // Call the register service
            Map<String, Object> serviceResponse = userService.registerUser(user);
            return new ResponseEntity<>(serviceResponse, HttpStatus.valueOf((Integer) serviceResponse.get("errorCode")));
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An unexpected error occurred. Please try again later.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            response.put("success", false);
            response.put("message", "Fill all data");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400 Bad Request
        }

        Map<String, Object> serviceResponse = userService.loginUser(loginRequest);
        return new ResponseEntity<>(serviceResponse, HttpStatus.valueOf((Integer) serviceResponse.get("code")));
    }
    @GetMapping("/profile")
    private ResponseEntity<Map<String, Object>> getUserProfile(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();


        // الحصول على التوكن من الهيدر
        String token = request.getHeader("Authorization");

        if (token == null) {
            response.put("success", false);
            response.put("message", "Invalid token or missing Authorization header");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            // فك التوكن واستخراج الـ username
            String email = jwtTokenProvider.getUsername(token);
            Map<String, Object> serviceResponse = userService.getUserDetails(email);
            return new ResponseEntity<>(serviceResponse, HttpStatus.valueOf((Integer) serviceResponse.get("code")));

        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", "Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/profile")
    private ResponseEntity<Map<String, Object>> getUserProfile(HttpServletRequest request , @RequestBody changePasswordRequest passwordRequest) {

        Map<String, Object> response = new HashMap<>();
        String token = request.getHeader("Authorization");
        String email = jwtTokenProvider.getUsername(token);
        if (token == null) {

            response.put("success", false);
            response.put("message", "Invalid token or missing Authorization header");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }


        Map<String, Object> serviceResponse = userService.updateUserPassword( email, passwordRequest);
        return new ResponseEntity<>(serviceResponse, HttpStatus.valueOf((Integer) serviceResponse.get("code")));


    }
    // Data validation function
    private String validateUserData(User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty() ||
                user.getAge() == null || user.getName() == null || user.getName().isEmpty() ||
                user.getLastName() == null || user.getLastName().isEmpty()) {
            return "Fill all fields";
        }
        return null;
    }
}
