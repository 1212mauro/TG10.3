package hr.fer.proinz.project_bajeet.web;


import hr.fer.proinz.project_bajeet.data.TextRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Text;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Slf4j
@Controller
@RequestMapping("/home")
public class MainPageController {

    private TextRepository textRepo;

    public MainPageController(TextRepository textRepo) {
        this.textRepo = textRepo;
    }

    @ModelAttribute
    public Text Text() { return new Text(); }

    @ModelAttribute
    public ArrayList<Text> textList() { return (ArrayList<Text>) textRepo.findAll(); }

    @GetMapping
    public String homepage(Authentication authentication, HttpServletRequest request, Model model) {

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            model.addAttribute("username", userDetails.getUsername());
            model.addAttribute("authorities", userDetails.getAuthorities());
        } else if (authentication.getPrincipal() instanceof OAuth2User oauth2User) {
            model.addAttribute("username", oauth2User.getAttribute("name"));
            model.addAttribute("email", oauth2User.getAttribute("email"));
            model.addAttribute("authorities", oauth2User.getAuthorities());
        }

        return "homepage";
    }

    @PostMapping
    public String post(Text text, Model model) {
        log.info(text.getText(), text.getId());
        textRepo.save(text);
        model.addAttribute("textList", textRepo.findAll());
        return "homepage";
    }
}