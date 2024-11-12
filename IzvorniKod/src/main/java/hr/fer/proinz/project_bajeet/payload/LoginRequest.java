package hr.fer.proinz.project_bajeet.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @Email
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
