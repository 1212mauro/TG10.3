package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vote")
public class Vote {

    public static enum VoteEnum {UPVOTE, DOWNVOTE;}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer voteID;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
    private User voter;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Thread thread;

    @Enumerated(EnumType.STRING)
    private VoteEnum voteType;

}
