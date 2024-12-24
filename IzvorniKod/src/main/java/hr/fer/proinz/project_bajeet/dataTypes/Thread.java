package hr.fer.proinz.project_bajeet.dataTypes;


import jakarta.persistence.*;
import java.util.Date;
import lombok.Data;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer threadId;

    private Integer maxResponses;

    private Integer maxMessages;

    private Boolean isPrivate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timeCreated;

    @ManyToOne
    @JoinColumn(name ="board_id")
    private Board parentBoard;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parentThread")
    List<hr.fer.proinz.project_bajeet.dataTypes.Message> messages;

    @ManyToMany
    @JoinTable(
    name = "caninteractwith", 
    joinColumns = @JoinColumn(name = "thread_id"), 
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    Set<User> participants;

}
