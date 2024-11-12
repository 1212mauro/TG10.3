package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class HelloController {

    @GetMapping("/hello")
    String hello(){
        return "Hello!";
    }

}
