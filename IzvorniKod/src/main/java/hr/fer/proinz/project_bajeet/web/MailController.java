package hr.fer.proinz.project_bajeet.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.proinz.project_bajeet.data.BoardRepository;
import hr.fer.proinz.project_bajeet.data.MessageRepository;
import hr.fer.proinz.project_bajeet.data.ThreadRepository;
import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.data.VoteRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Thread;
import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.service.MailService;

@RestController
@RequestMapping("/mail")
public class MailController {

    private final ThreadRepository threadRepo;
    private final BoardRepository boardRepo;
    private final VoteRepository voteRepo;
    private final UserRepository userRepo;
    private final MessageRepository messageRepo;

    public MailController( BoardRepository boardRepo, ThreadRepository threadRepo, VoteRepository voteRepo, UserRepository userRepo, MessageRepository messageRepo){ 
        this.threadRepo = threadRepo; 
        this.boardRepo = boardRepo;
        this.voteRepo = voteRepo;
        this.userRepo = userRepo;
        this.messageRepo = messageRepo;
    }
    
    @Autowired
    private MailService mailService;

    @PostMapping("/{recipient}")
    public String sendEmail(@PathVariable String recipient, @RequestBody String body){
        mailService.sendEmail(recipient, "napad na poljsku", body);
        return "sent successfully";
    }

    @PutMapping("addUserToThread/{threadID}/{userID}")
    public String addUserToThread(@PathVariable int threadID, @PathVariable int userID) {
        
        Thread t = threadRepo.findByThreadID(threadID);
        User u = userRepo.findByUserId(userID);

        List<User> users = t.getParticipants();
        users.add(u);
        t.setParticipants(users);
        t = threadRepo.save(t);

        String body = "You have been added as a participant of thread " + t.getTitle(); 

        mailService.sendEmail(u.getUsername(), "napad na poljsku", body);
        return "sent successfully";
    }

}
