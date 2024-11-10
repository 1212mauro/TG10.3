package hr.fer.proinz.project_bajeet.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class RootPageController {
    @GetMapping("/")
    public String home() { return "rootpage";}
}
