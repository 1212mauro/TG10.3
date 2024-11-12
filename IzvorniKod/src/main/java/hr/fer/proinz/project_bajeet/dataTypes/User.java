package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    public static enum Role {ADMIN, TENANT, REPRESENTATIVE;}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    
    @Column(length=16, unique=true)
    @Size(min=3, max=16)
    private String username;

    @Column(length=128, nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany(mappedBy = "users")
    Set<Board> boards;

    @ManyToMany(mappedBy = "participants")
    Set<hr.fer.proinz.project_bajeet.dataTypes.Thread> threads;

    @OneToMany(mappedBy = "voter")
    Set<Vote> votes;

    public User(String username, String passwordHash){
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = Role.TENANT;
    }

}
