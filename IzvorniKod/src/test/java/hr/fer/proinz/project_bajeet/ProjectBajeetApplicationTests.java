package hr.fer.proinz.project_bajeet;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import hr.fer.proinz.project_bajeet.data.BoardRepository;
import hr.fer.proinz.project_bajeet.data.MessageRepository;
import hr.fer.proinz.project_bajeet.data.ThreadRepository;
import hr.fer.proinz.project_bajeet.data.UserRepository;
import hr.fer.proinz.project_bajeet.dataTypes.Board;
import hr.fer.proinz.project_bajeet.dataTypes.Message;
import hr.fer.proinz.project_bajeet.dataTypes.Thread;
import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.payload.LoginRequest;
import hr.fer.proinz.project_bajeet.service.AuthenticationService;


@SpringBootTest
class ProjectBajeetApplicationTests {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private BoardRepository boardRepo;

	@Autowired
	private ThreadRepository threadRepo;

	@Autowired 
	private MessageRepository messageRepo;

	@Test
	void testExistingUser() {
		String username = "testKorisnik" + Math.random();
		String password = "testPassword" + Math.random();
		LoginRequest newUser = new LoginRequest(username, password);
		User testUser = authenticationService.signup(newUser);

		assertThrows(DataIntegrityViolationException.class, () -> {authenticationService.signup(newUser);});
		userRepo.deleteById(testUser.getUserId());
	}

	@Test
	void testNewUser() {
		String username = "testKorisnik" + Math.random();
		String password = "testPassword" + Math.random();
		LoginRequest newUser = new LoginRequest(username, password);

		User testUser = authenticationService.signup(newUser);

		Assertions.assertThat(testUser).isNotNull();
		Assertions.assertThat(testUser.getUsername()).isEqualTo(username);

		userRepo.deleteById(testUser.getUserId());
	}

	@Test
	void testDeleteUser() {
		String username = "testKorisnik" + Math.random();
		String password = "testPassword" + Math.random();
		LoginRequest newUser = new LoginRequest(username, password);

		User testUser = authenticationService.signup(newUser);

		userRepo.deleteById(testUser.getUserId());

		Assertions.assertThat(userRepo.findByUsername(newUser.getUsername()).isPresent()).isFalse();
	}

	@Test
	void testFindByUsername() {
		String username = "testKorisnik" + Math.random();
		String password = "testPassword" + Math.random();
		LoginRequest newUser = new LoginRequest(username, password);

		User testUser = authenticationService.signup(newUser);

		Optional<User> foundUser = userRepo.findByUsername(username);

		Assertions.assertThat(foundUser.isPresent()).isTrue();
		Assertions.assertThat(foundUser.get().getUsername()).isEqualTo(username);

		userRepo.deleteById(testUser.getUserId());
	}

	@Test
	void testBoard(){
		Board board = new Board();

		board.setAddress("Adresa testiranja");

		Board savedBoard = boardRepo.save(board);

		Optional<Board> foundBoard = boardRepo.findById(savedBoard.getBoardID());

		Assertions.assertThat(foundBoard.isPresent()).isTrue();
		Assertions.assertThat(foundBoard.get().getAddress()).isEqualTo(board.getAddress());

		boardRepo.deleteById(savedBoard.getBoardID());

		foundBoard = boardRepo.findById(savedBoard.getBoardID());

		Assertions.assertThat(boardRepo.findById(savedBoard.getBoardID()).isPresent()).isFalse();
	}

	@Test
	void testThread(){
		Board board = new Board();

		board.setAddress("Adresa testiranja threada");

		Thread thread = new Thread();

		thread.setDescription("Opis testiranja threada");
		thread.setHasVoting(true);
		thread.setTitle("Naslov testiranja threada");
		thread.setPublic(true);

		List<Thread> threadovi = new ArrayList<Thread>();
		threadovi.add(thread);
		board.setThreads(threadovi);

		Board savedBoard = boardRepo.save(board);

		Optional<Thread> foundThread = threadRepo.findById(savedBoard.getThreads().get(0).getThreadID());

		Assertions.assertThat(foundThread.isPresent()).isTrue();
		Assertions.assertThat(foundThread.get().getTitle()).isEqualTo(thread.getTitle());
		Assertions.assertThat(foundThread.get().getDescription()).isEqualTo(thread.getDescription());

		boardRepo.deleteById(savedBoard.getBoardID());

		foundThread = threadRepo.findById(savedBoard.getThreads().get(0).getThreadID());

		Assertions.assertThat(boardRepo.findById(savedBoard.getBoardID()).isPresent()).isFalse();
	}

	@Test
	void testMessage(){
		Board board = new Board();

		board.setAddress("Adresa testiranja poruke");

		Thread thread = new Thread();

		thread.setDescription("Opis testiranja poruke");
		thread.setHasVoting(true);
		thread.setTitle("Naslov testiranja poruke");
		thread.setPublic(true);

		String username = "testKorisnik" + Math.random();
		String password = "testPassword" + Math.random();
		LoginRequest newUser = new LoginRequest(username, password);

		User testUser = authenticationService.signup(newUser);

		Message message = new Message();

		message.setMessageAuthor(testUser);

		String content = "Testiranje poruke";

		message.setContent(content);
		message.setHasVoting(false);

		List<Message> messages = new ArrayList<Message>();
		messages.add(message);

		thread.setComments(messages);

		List<Thread> threadovi = new ArrayList<Thread>();
		threadovi.add(thread);
		board.setThreads(threadovi);

		Board savedBoard = boardRepo.save(board);


		Optional<Message> foundMessage = messageRepo.findById(savedBoard.getThreads().get(0).getComments().get(0).getMessageId());

		Assertions.assertThat(foundMessage.isPresent()).isTrue();
		Assertions.assertThat(foundMessage.get().getContent()).isEqualTo(content);

		boardRepo.deleteById(savedBoard.getBoardID());

		foundMessage = messageRepo.findById(savedBoard.getThreads().get(0).getComments().get(0).getMessageId());

		Assertions.assertThat(foundMessage.isPresent()).isFalse();
	}
}
