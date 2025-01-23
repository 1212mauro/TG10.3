package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer threadID;

    private String title;

    private String description;

    private boolean hasVoting;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timeCreated;

    @OneToMany(cascade = CascadeType.ALL)
    List<Message> comments;

    @ManyToMany
    @JoinTable(
    name = "caninteractwith",
    joinColumns = @JoinColumn(name = "thread_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    List<User> participants;

    private boolean isPublic = true;
}
