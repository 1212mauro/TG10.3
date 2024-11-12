package hr.fer.proinz.project_bajeet.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.payload.LoginRequest;
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
@RequestMapping("/login/oauth2")
public class OAuth2Controller {

    @Value("${oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/google")
    public ModelAndView google() {
        String googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri=https://projectbajeet.work.gd/login/oauth2/code/google&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code";
        return new ModelAndView("redirect:" + googleUrl);
    }
    
    @GetMapping("/github")
    public ModelAndView github() {
        String githubUrl = "https://github.com/login/oauth/authorize?client_id=" + githubClientId + "&redirect_uri=https://projectbajeet.work.gd/login/oauth2/code/github&allow_signup=false&scope=read:user";
        return new ModelAndView("redirect:" + githubUrl);
    }
    
    @GetMapping("/code/google")
    public ModelAndView googleCode(@RequestParam String code) {

        //todo google oauth2token novi user ili login

        User authenticatedUser = authenticationService.authenticate(new LoginRequest("user", "pass"));

        return new ModelAndView("redirect:/");
    }

    @GetMapping("/code/github")
    public ModelAndView githubCode(@RequestParam String code) {

        //todo google oauth2token novi user ili login

        User authenticatedUser = authenticationService.authenticate(new LoginRequest("user", "pass"));

        return new ModelAndView("redirect:/");
    }

}
