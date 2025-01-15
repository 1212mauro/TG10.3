package hr.fer.proinz.project_bajeet.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.payload.LoginRequest;
import hr.fer.proinz.project_bajeet.payload.LoginResponse;
import hr.fer.proinz.project_bajeet.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import hr.fer.proinz.project_bajeet.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class LoginController {
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginUser) {
        User authenticatedUser = authenticationService.authenticate(loginUser);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    public User register(@RequestBody LoginRequest registerUser) {
        User registeredUser = authenticationService.signup(registerUser);
        log.info(registeredUser + " user created");
        return registeredUser;
    }

}
