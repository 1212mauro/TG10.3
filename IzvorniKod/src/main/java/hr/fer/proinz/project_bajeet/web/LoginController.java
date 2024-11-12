package hr.fer.proinz.project_bajeet.web;

import org.springframework.security.authentication.jaas.LoginExceptionResolver;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.payload.LoginRequest;

@RestController
@RequestMapping("/api")
public class LoginController {

    private UserRepository userRepo;
    private BCryptPasswordEncoder encoder;

    public LoginController(UserRepository userRepo){
        this.userRepo = userRepo;
        this.encoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        User user = userRepo.findByUsername(request.getUsername());
        if (user == null) return "User doesen't exist";
        return (encoder.matches(user.getUsername() + request.getPassword(), user.getPasswordHash())) ? "Correct password" : "Incorrect password";
    }

    @PostMapping("/register")
    User newuser(@RequestBody LoginRequest newUser) {
        String passwordHash = encoder.encode(newUser.getUsername() + newUser.getPassword());
        User user = new User(newUser.getUsername(), passwordHash);
        return userRepo.save(user);
    }

}
