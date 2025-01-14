package hr.fer.proinz.project_bajeet.data;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
