package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer threadID;

    private String title;

    private String description;

    private Boolean hasVoting;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timeCreated;

    @ManyToOne
    @JoinColumn(name ="board_id")
    @JsonBackReference
    private Board parentBoard;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parentThread")
    List<Message> comments;

    @ManyToMany
    @JoinTable(
    name = "caninteractwith", 
    joinColumns = @JoinColumn(name = "thread_id"), 
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    List<User> participants;

    @OneToMany
    List<Vote> votes;

    @Override
    public String toString(){
        return "ID : " + this.threadID + " title : " + this.title + " : " + this.hasVoting + ":" + this.timeCreated + ":" + this.parentBoard.getBoardID() + ":" + this.getComments();
    }
}
