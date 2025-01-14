package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.proinz.project_bajeet.dataTypes.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer>{
    Vote findByVoteID(Integer voteId);
}
