package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.proinz.project_bajeet.dataTypes.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer>{
    Vote findByVoteID(Integer voteId);
}
