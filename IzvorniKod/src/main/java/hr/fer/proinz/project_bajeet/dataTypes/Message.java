package hr.fer.proinz.project_bajeet.dataTypes;


import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer messageId;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timeSent;

    @ManyToOne
    @JoinColumn(name ="user_id")
    private User messageAuthor;

    private boolean hasVoting;

    @OneToMany(cascade = CascadeType.ALL)
    List<Vote> votes;
}
