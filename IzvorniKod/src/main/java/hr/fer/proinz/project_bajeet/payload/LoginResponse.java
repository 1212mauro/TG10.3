package hr.fer.proinz.project_bajeet.payload;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private long expiresIn; 
}
