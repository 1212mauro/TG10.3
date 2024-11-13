package hr.fer.proinz.project_bajeet.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
