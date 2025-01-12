package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.proinz.project_bajeet.data.BoardRepository;
import hr.fer.proinz.project_bajeet.data.ThreadRepository;
import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.data.VoteRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Board;
import hr.fer.proinz.project_bajeet.dataTypes.Thread;
import hr.fer.proinz.project_bajeet.dataTypes.Vote;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/main")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class MainController {

    private final ThreadRepository threadRepo;
    private final BoardRepository boardRepo;
    private final VoteRepository voteRepo;
    private final UserRepository userRepo;

    public MainController( BoardRepository boardRepo, ThreadRepository threadRepo, VoteRepository voteRepo, UserRepository userRepo ){ 
        this.threadRepo = threadRepo; 
        this.boardRepo = boardRepo;
        this.voteRepo = voteRepo;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<Thread> getAllThreads() {
        // Board b = new Board();
        // b.setAddress("tost");
        // boardRepo.save(b);
        Board b = boardRepo.findAll().get(0);
        log.info(b.toString());
        log.info(threadRepo.findAll() + " This is a return debug");
        log.info(userRepo.findAll().toString());
        return threadRepo.findAll();
    }

    @PostMapping("/add")
    public Thread addNewThread(@RequestBody Thread newThread) {
        threadRepo.save(newThread);

        newThread.setVotes(List.of());

        // log.info(threadRepo.findById(newThread.getThreadID()) + " neki debug message");

        return newThread;
    }

    @PutMapping("/vote/{id}")
    public Thread addVote(@PathVariable int id ,@RequestBody Vote vote) {

        log.info(vote + "vote debug");

        Thread threadToVote = threadRepo.findByThreadID(id);
        List<Vote> votes = threadToVote.getVotes();

        votes.add(vote);
        threadToVote.setVotes(votes);

        return threadRepo.save(threadToVote);

    }

    @DeleteMapping("deleteVote/{threadID}/{voteID}")
    public String deleteVote(@PathVariable int voteID, @PathVariable int threadID){

        Thread t = threadRepo.findByThreadID(threadID);
        List<Vote> votes = t.getVotes();
        votes.removeIf(v -> v.getVoteID() == voteID);
        t.setVotes(votes);
        log.info(votes + "votes");
        threadRepo.save(t);

        log.info(threadRepo.findAll().toString());

        voteRepo.deleteById(voteID);
        log.info(voteRepo.findAll() + " all votes");
        return "successfully deleted vote with id: " + voteID;

    }

}