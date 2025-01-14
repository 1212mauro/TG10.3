package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.proinz.project_bajeet.dataTypes.Thread;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer>{
    Thread findByThreadID(Integer threadId);
}
