package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "board")
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer boardID;
    
    @Column(length=50, unique=true)
    @Size(max=50)
    private String address;

    @OneToMany(cascade = CascadeType.ALL)
    List<Thread> threads;

    @ManyToMany
    @JoinTable(
    name = "isapartof", 
    joinColumns = @JoinColumn(name = "boardID"), 
    inverseJoinColumns = @JoinColumn(name = "userID"))
    List<User> users;

}
