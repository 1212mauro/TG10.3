package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.proinz.project_bajeet.data.BoardRepository;
import hr.fer.proinz.project_bajeet.data.MessageRepository;
import hr.fer.proinz.project_bajeet.data.ThreadRepository;
import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.data.VoteRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Board;
import hr.fer.proinz.project_bajeet.dataTypes.Message;
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
    private final MessageRepository messageRepo;

    public MainController( BoardRepository boardRepo, ThreadRepository threadRepo, VoteRepository voteRepo, UserRepository userRepo, MessageRepository messageRepo){ 
        this.threadRepo = threadRepo; 
        this.boardRepo = boardRepo;
        this.voteRepo = voteRepo;
        this.userRepo = userRepo;
        this.messageRepo = messageRepo;
    }

    @GetMapping("/getBoards")
    public List<Board> getBoards() {
        return boardRepo.findAll();
    }

    @GetMapping("/{boardID}")
    public List<Thread> getThreads(@PathVariable int boardID) {
        Board b = boardRepo.findByBoardID(boardID);
        return b.getThreads();
    }
    
    @PostMapping("/addBoard")
    public Board addBoard(@RequestBody Board newBoard) { 
        return boardRepo.save(newBoard);
    }

    @PostMapping("/addThread/{boardID}")
    public Thread addNewThread(@PathVariable int boardID, @RequestBody Thread newThread) {
        
        Thread t = threadRepo.save(newThread);

        log.info(t + " saved thread");
        Board b = boardRepo.findByBoardID(boardID);
        List<Thread> threads = b.getThreads();
        threads.add(t);
        b.setThreads(threads);
        b = boardRepo.save(b);
    
        t.setVotes(List.of());
        t.setComments(List.of());


        return t;
    }

    @PostMapping("addComment/{threadID}")
    public List<Message> addComment(@PathVariable int threadID, @RequestBody Message newMessage) {
        
        Message message = messageRepo.save(newMessage);
        
        Thread t = threadRepo.findByThreadID(threadID);
        List<Message> comments = t.getComments();
        comments.add(message);
        t.setComments(comments);
        t = threadRepo.save(t);

        // log.info(messageRepo.findAll() + "messages from repo");
        // log.info(threadRepo.findByThreadID(threadID) + "thread for message");
        return t.getComments();
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
        // log.info(votes + "votes");
        threadRepo.save(t);

        // log.info(threadRepo.findAll().toString());

        voteRepo.deleteById(voteID);
        // log.info(voteRepo.findAll() + " all votes");
        return "successfully deleted vote with id: " + voteID;
    }

    @DeleteMapping("deleteComment/{threadID}/{commentID}")
    public String deleteComment(@PathVariable int commentID, @PathVariable int threadID){

        Thread t = threadRepo.findByThreadID(threadID);
        List<Message> messages = t.getComments();
        messages.removeIf(m -> m.getMessageId() == commentID);
        t.setComments(messages);
        // log.info(votes + "votes");
        threadRepo.save(t);

        messageRepo.deleteById(commentID);
        log.info(messageRepo.findAll() + " all comments");
        return "successfully deleted comment with id: " + commentID;
    } 
}