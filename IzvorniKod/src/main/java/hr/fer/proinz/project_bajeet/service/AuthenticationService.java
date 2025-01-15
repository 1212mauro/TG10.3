package hr.fer.proinz.project_bajeet.service;

import hr.fer.proinz.project_bajeet.payload.LoginRequest;
import lombok.extern.slf4j.Slf4j;
import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.dataTypes.User.Role;
import hr.fer.proinz.project_bajeet.data.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Slf4j
public class AuthenticationService {
    @Autowired
    private final UserRepository userRepo;
    
    public AuthenticationService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    public User signup(@RequestBody LoginRequest input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setPasswordHash(passwordEncoder.encode(input.getPassword()));
        user.setRole(Role.ADMIN);
        return userRepo.save(user);
    }

    private User newOauthUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode("oauth"));
        user.setRole(Role.TENANT);

        return userRepo.save(user);
    }

    public User getOauthUser(String username) {
        return userRepo.findByUsername(username)
                .orElseGet(() -> newOauthUser(username));
    }

    public User authenticate(LoginRequest input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepo.findByUsername(input.getUsername())
                .orElseThrow();
    }
}