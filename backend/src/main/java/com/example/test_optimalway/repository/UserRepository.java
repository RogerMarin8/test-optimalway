package com.example.test_optimalway.repository;

import com.example.test_optimalway.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}