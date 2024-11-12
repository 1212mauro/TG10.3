package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {

    public static enum Role {ADMIN, TENANT, REPRESENTATIVE;}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    
    @Column(length=16, unique=true)
    @Size(min=3, max=16)
    private String username;

    @Column(columnDefinition = "bytea", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany(mappedBy = "users")
    Set<Board> boards;

    @ManyToMany(mappedBy = "participants")
    Set<hr.fer.proinz.project_bajeet.dataTypes.Thread> threads;

    @OneToMany(mappedBy = "voter")
    Set<Vote> votes;

}
