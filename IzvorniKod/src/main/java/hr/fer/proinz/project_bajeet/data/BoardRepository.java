package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.proinz.project_bajeet.dataTypes.Board;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer>{
    Board findByBoardID(Integer BoardId);
    List<Board> findByAddress(String address);
}
