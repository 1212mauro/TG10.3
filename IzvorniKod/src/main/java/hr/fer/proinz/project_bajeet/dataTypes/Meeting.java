package hr.fer.proinz.project_bajeet.dataTypes;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int meetingID;

    private String title;

    private String description;

    private String state;

    @ManyToMany
    @JoinTable(
    joinColumns = @JoinColumn(name = "meeting_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> participants;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<MeetingPoint> points;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timeOfMeeting;
    
}
