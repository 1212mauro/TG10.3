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
import hr.fer.proinz.project_bajeet.service.AuthenticationService;


//redirect izgleda ovako
//https://projectbajeet.work.gd/login/oauth2/code/google
//?state    = neki token za csrf
//&code     = kod koji se mijenja za token
//&scope    = email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
//&authuser = 0
//&prompt   = none

@RestController
@RequestMapping("/login/oauth2/code")
public class OAuth2Controller {
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;
    
    @PostMapping("/google")
    public ResponseEntity<LoginResponse> google(@RequestBody LoginRequest loginUser) {

        //todo google oauth2token novi user ili login

        User authenticatedUser = authenticationService.authenticate(loginUser);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/github")
    public ResponseEntity<User> github(@RequestBody LoginRequest registerUser) {

        //todo google oauth2token novi user ili login

        User registeredUser = authenticationService.signup(registerUser);

        return ResponseEntity.ok(registeredUser);
    }

}
