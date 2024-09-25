package com.example.userauthapi.repository;

import com.example.userauthapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Find By Email function
    Optional<User> findByEmail(String email);

}
