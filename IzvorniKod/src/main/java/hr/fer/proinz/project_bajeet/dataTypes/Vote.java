package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vote")
public class Vote {

    public static enum VoteEnum {UPVOTE, DOWNVOTE;}

    @EmbeddedId
    private PollVoteKey pollVoteId;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User voter;

    @ManyToOne
    @MapsId("pollId")
    @JoinColumn(name = "message_id")
    private Poll targetPoll;

    @Enumerated(EnumType.STRING)
    private VoteEnum vote;

}
