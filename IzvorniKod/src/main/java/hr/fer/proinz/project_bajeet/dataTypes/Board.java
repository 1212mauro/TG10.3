package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Set;
import lombok.Data;

@Data
@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer boardID;
    
    @Column(length=50, unique=true)
    @Size(max=50)
    private String address;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parentBoard")
    List<hr.fer.proinz.project_bajeet.dataTypes.Thread> threads;

    @ManyToMany
    @JoinTable(
    name = "isapartof", 
    joinColumns = @JoinColumn(name = "boardID"), 
    inverseJoinColumns = @JoinColumn(name = "userID"))
    Set<User> users;

}
