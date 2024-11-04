package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class MainPageController {
    @GetMapping("/test")
    public String home() {
        return "Server time: " + new Date() + "\n";
    }
}
