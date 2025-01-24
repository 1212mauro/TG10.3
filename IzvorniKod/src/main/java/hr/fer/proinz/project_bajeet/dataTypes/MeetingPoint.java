package hr.fer.proinz.project_bajeet.dataTypes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class MeetingPoint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int MeetingPointID;

    private String title;

    private String type;

    private String conclusion;

}
