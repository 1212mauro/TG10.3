package hr.fer.proinz.project_bajeet.dataTypes;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "text")
public class Text {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private String text;
}
