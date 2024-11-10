package hr.fer.proinz.project_bajeet.data;

import hr.fer.proinz.project_bajeet.dataTypes.Text;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TextRepository extends JpaRepository<Text, Integer> {
}
