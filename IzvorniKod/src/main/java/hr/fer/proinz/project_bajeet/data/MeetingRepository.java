package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.proinz.project_bajeet.dataTypes.Meeting;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer>{
    
}
