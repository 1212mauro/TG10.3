package hr.fer.proinz.project_bajeet.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.payload.LoginRequest;
import hr.fer.proinz.project_bajeet.payload.LoginResponse;
import hr.fer.proinz.project_bajeet.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import hr.fer.proinz.project_bajeet.service.AuthenticationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
@Slf4j
public class LoginController {
    
    private final UserRepository userRepo;

    public LoginController(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;
    
    @GetMapping("/getOauthUser/{username}")
    public User getOauthUser(@PathVariable String username) {
        User userInCaseOfFail = new User(username, "jaBasJakoJakoJakoJakoJakoJakoJakoJakoJakoJakoJakoJakoVolimPrsut");
        Optional<User> user = userRepo.findByUsername(username);
        return user.orElse(userRepo.save(userInCaseOfFail));
    }
    

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginUser) {
        User authenticatedUser = authenticationService.authenticate(loginUser);

        // log.info(authenticatedUser + " authenticated user");

        // String jwtToken = jwtService.generateToken(authenticatedUser);

        // LoginResponse loginResponse = new LoginResponse();
        // loginResponse.setToken(jwtToken);
        // loginResponse.setExpiresIn(jwtService.getExpirationTime());

        // return ResponseEntity.ok(loginResponse);
        return authenticatedUser;
    }

    @PostMapping("/register")
    public User register(@RequestBody LoginRequest registerUser) {
        User registeredUser = authenticationService.signup(registerUser);
        log.info(registeredUser + " user created");
        return registeredUser;
    }

}
