package hr.fer.proinz.project_bajeet.data;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<hr.fer.proinz.project_bajeet.dataTypes.User, Integer> {
    User findByUsername(String username);
}
