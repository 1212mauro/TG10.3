package hr.fer.proinz.project_bajeet.data;

import hr.fer.proinz.project_bajeet.dataTypes.Message;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    Message findByMessageId(Integer messageId);
}
