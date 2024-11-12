package hr.fer.proinz.project_bajeet.web;


import hr.fer.proinz.project_bajeet.data.MessageRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Message;
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

    private MessageRepository messageRepo;

    public MainPageController(MessageRepository messageRepo) {
        this.messageRepo = messageRepo;
    }

    @ModelAttribute
    public Message Message() { return new Message(); }

    @ModelAttribute
    public ArrayList<Message> textList() { return (ArrayList<Message>) messageRepo.findAll(); }

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
    public String post(Message message, Model model) {
        log.info(message.getContent(), message.getMessageId());
        messageRepo.save(message);
        model.addAttribute("textList", messageRepo.findAll());
        return "homepage";
    }
}