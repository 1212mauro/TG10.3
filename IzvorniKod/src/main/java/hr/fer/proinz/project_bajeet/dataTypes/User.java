package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails{

    public static enum Role {ADMIN, TENANT, REPRESENTATIVE;}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    
    @Column(length=320, unique=true)
    @Size(min=3, max=320)
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
