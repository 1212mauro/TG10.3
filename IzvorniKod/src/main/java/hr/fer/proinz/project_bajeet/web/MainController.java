package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.proinz.project_bajeet.data.BoardRepository;
import hr.fer.proinz.project_bajeet.data.ThreadRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Board;
import hr.fer.proinz.project_bajeet.dataTypes.Thread;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/main")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class MainController {

    private final ThreadRepository threadRepo;
    private final BoardRepository boardRepo;

    public MainController( BoardRepository boardRepo, ThreadRepository threadRepo ){ 
        this.threadRepo = threadRepo; 
        this.boardRepo = boardRepo;
    }

    @GetMapping
    public List<Thread> getAllThreads() {
        // Board b = new Board();
        // b.setAddress("tost");
        // boardRepo.save(b);
        Board b = boardRepo.findAll().get(0);
        log.info(b.toString());
        log.info(threadRepo.findAll().toString() + " This is a return debug");
        return threadRepo.findAll();
    }

    @PostMapping("/add")
    public Thread addNewThread(@RequestBody Thread newThread) {
        String address = newThread.getParentBoard().getAddress();
        Board parentBoard = boardRepo.findByAddress(address).get(0);

        newThread.setParentBoard(parentBoard);
        threadRepo.save(newThread);
        // log.info(newThread.toString());

        // newThread = threadRepo.findById(newThread.getThreadID()).get();

        log.info(newThread.toString());
        Board b = boardRepo.findAll().get(0);
        log.info(b.toString());
        return newThread;
    }
    
}
