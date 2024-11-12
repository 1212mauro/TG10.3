package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import lombok.Data;

@Embeddable
@Data
class PollVoteKey implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "poll_id")
    private Integer pollId;

    public final boolean equals(PollVoteKey other) {
        if ((other.getUserId() == this.userId) && (other.getPollId() == this.pollId)) return true;
        return false;
    }
    
    public final int hashCode() {
        return Objects.hash(userId, pollId);
    }

}