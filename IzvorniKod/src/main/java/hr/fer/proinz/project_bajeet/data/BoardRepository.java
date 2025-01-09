package hr.fer.proinz.project_bajeet.data;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.proinz.project_bajeet.dataTypes.Board;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Integer>{
    List<Board> findByBoardID(Integer BoardId);
    List<Board> findByAddress(String address);
}
