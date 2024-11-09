package hr.fer.proinz.project_bajeet.web;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequestMapping("/home")
public class MainPageController {

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
}