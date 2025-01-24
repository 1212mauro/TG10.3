package hr.fer.proinz.project_bajeet.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.dataTypes.Vote;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/main")
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

    @GetMapping("/allThreads")
    public List<Thread> getAllThread() {
        return threadRepo.findAll();
    }

    @GetMapping("/allThreadsForBoard/{boardID}")
    public List<Thread> getAllThreadsForBoard(@PathVariable int boardID) {
        return boardRepo.findByBoardID(boardID).getThreads();
    }
    
    @GetMapping("/{boardID}/{userID}")
    public List<Thread> getThreadsForUser(@PathVariable int boardID, @PathVariable int userID) {
        User u = userRepo.findByUserId(userID);
        Board b = boardRepo.findByBoardID(boardID);
        List<Thread> threadsForUser = b.getThreads().stream().filter(thread -> thread.getParticipants().contains(u)).toList();
        
        return threadsForUser;
    }

    @GetMapping("/public/{boardID}")
    public List<Thread> getPublicThreads(@PathVariable int boardID) {

        Board b = boardRepo.findByBoardID(boardID);
        return b.getThreads().stream().filter(thread -> thread.isPublic()).toList();
    }

    @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/getBoardsForUser/{userID}")
    public List<Board> getBoardsForUser(@PathVariable int userID) {
        User u = userRepo.findByUserId(userID);
        List<Board> boardsForUser = boardRepo.findAll().stream().filter(board -> board.getUsers().contains(u)).toList();
        return boardsForUser;
    }
    

    @GetMapping("/getUsersOnBoard/{boardID}")
    public List<User> getUsers(@PathVariable int boardID) {
        Board b = boardRepo.findByBoardID(boardID);
        return b.getUsers();
    }
    
    @GetMapping("/getUsersNotOnThread/{boardID}/{threadID}")
    public List<User> getUsersOnThread(@PathVariable int boardID, @PathVariable int threadID) {

        List<User> usersOnThread = threadRepo.findByThreadID(threadID).getParticipants();
        List<User> allUsersOnBoard = boardRepo.findByBoardID(boardID).getUsers();

        List<User> retValue = allUsersOnBoard.stream().filter(user -> !usersOnThread.contains(user)).toList();
        log.info(retValue + " return value");
        return retValue;
    }
    
    
    @PostMapping("/addBoard")
    public Board addBoard(@RequestBody Board newBoard) { 
        return boardRepo.save(newBoard);
    }

    @PostMapping("/addThread/{boardID}")
    public Thread addNewThread(@PathVariable int boardID, @RequestBody Thread newThread) {
        
        Thread t = threadRepo.save(newThread);

        Board b = boardRepo.findByBoardID(boardID);
        List<Thread> threads = b.getThreads();
        threads.add(t);
        b.setThreads(threads);
        b = boardRepo.save(b);

        return t;
    }

    @PostMapping("addComment/{threadID}")
    public Message addComment(@PathVariable int threadID, @RequestBody Message newMessage) {
        
        Message message = messageRepo.save(newMessage);

        Thread t = threadRepo.findByThreadID(threadID);
        List<Message> comments = t.getComments();
        comments.add(message);
        t.setComments(comments);
        t = threadRepo.save(t);

        return message;
    }

    @PutMapping("/vote/{messageID}")
    public Message addVote(@PathVariable int messageID ,@RequestBody Vote vote) {

        Message messageToVote = messageRepo.findByMessageId(messageID);
        List<Vote> votes = messageToVote.getVotes();
        votes.add(vote);
        messageToVote.setVotes(votes);

        return messageRepo.save(messageToVote);
    }

    @PutMapping("/updateBoard")
    public Board updateBoard(@RequestBody Board updatedBoard) {
        return boardRepo.save(updatedBoard);
    }

    @PutMapping("/updateUser")
    public User updateBoard(@RequestBody User updatedUser) {
        return userRepo.save(updatedUser);
    }

    @DeleteMapping("deleteVote/{messageID}/{voteID}")
    public String deleteVote(@PathVariable int voteID, @PathVariable int messageID){

        Message message = messageRepo.findByMessageId(messageID);

        List<Vote> votes = message.getVotes();
        votes.removeIf(v -> v.getVoteID() == voteID);
        message.setVotes(votes);
        messageRepo.save(message);

        voteRepo.deleteById(voteID);

        return "successfully deleted vote with id: " + voteID;
    }

    @DeleteMapping("deleteComment/{threadID}/{commentID}")
    public String deleteComment(@PathVariable int commentID, @PathVariable int threadID){

        Thread t = threadRepo.findByThreadID(threadID);
        List<Message> messages = t.getComments();
        messages.removeIf(m -> m.getMessageId() == commentID);
        t.setComments(messages);

        threadRepo.save(t);

        messageRepo.deleteById(commentID);
        log.info(messageRepo.findAll() + " all comments");
        return "successfully deleted comment with id: " + commentID;
    }

    @GetMapping("/userInfo")
    public User userInfo(@AuthenticationPrincipal User user) {
        return user;
    }
    
}