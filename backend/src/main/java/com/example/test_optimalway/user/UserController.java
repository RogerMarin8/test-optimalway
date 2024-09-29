package com.example.test_optimalway.user;

import com.example.test_optimalway.user.User;
import com.example.test_optimalway.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Read all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Read one user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Update a user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setSurname(updatedUser.getSurname());
                    user.setEmail(updatedUser.getEmail());
                    User savedUser = userRepository.save(user);
                    return ResponseEntity.ok(savedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/welcome")
    public ResponseEntity<String> welcome() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<User> userOptional = userRepository.findByEmail(email);

        User user = userOptional.get();
        return ResponseEntity.ok("Benvingut " + user.getName() + " " + user.getSurname());
    }
}
