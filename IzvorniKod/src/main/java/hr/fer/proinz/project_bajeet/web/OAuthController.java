package hr.fer.proinz.project_bajeet.web;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

import hr.fer.proinz.project_bajeet.dataTypes.User;
import hr.fer.proinz.project_bajeet.service.JwtService;
import hr.fer.proinz.project_bajeet.service.AuthenticationService;

@RestController
@RequestMapping("/oauth2")
public class OAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;

    @Value("${spring.security.oauth2.client.registration.github.redirect-uri}")
    private String githubRedirectUri;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/google")
    public ModelAndView google() {
        String googleUrl =  "http://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId +
                            "&redirect_uri=" + googleRedirectUri +
                            "&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code";
        return new ModelAndView("redirect:" + googleUrl);
    }
    
    @GetMapping("/github")
    public ModelAndView github() {
        String githubUrl =  "http://github.com/login/oauth/authorize?client_id=" + githubClientId +
                            "&redirect_uri=" + githubRedirectUri +
                            "&allow_signup=false&scope=read:user";
        return new ModelAndView("redirect:" + githubUrl);
    }
    
    @GetMapping("/code/google")
    public ModelAndView googleCode(@RequestParam String code, @RequestParam(required=false) String error) {

        if (error != null) {
            return new ModelAndView("redirect:/login?error=".concat(error));
        }

        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httppost = new HttpPost("https://oauth2.googleapis.com/token");

        List<NameValuePair> params = new ArrayList<NameValuePair>(5);
        params.add(new BasicNameValuePair("code", code));
        params.add(new BasicNameValuePair("client_id", googleClientId));
        params.add(new BasicNameValuePair("client_secret", googleClientSecret));
        params.add(new BasicNameValuePair("redirect_uri", googleRedirectUri));
        params.add(new BasicNameValuePair("grant_type", "authorization_code"));

        try {
            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        CloseableHttpResponse response;
        try {
            response = httpclient.execute(httppost);
        } catch (IOException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }
        
        HttpEntity entity = response.getEntity();

        String token = null;
        if (entity != null) {
            try (InputStream instream = entity.getContent()) {
                String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode nodeResponse;
                try {
                    nodeResponse = mapper.readTree(jsonResponse);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                }
                token = nodeResponse.get("access_token").asText();
            } catch (IOException e1) {
                e1.printStackTrace();
                return new ModelAndView("redirect:/login?error=".concat(e1.getMessage()));
            } finally {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        CloseableHttpResponse getResponse;
        URIBuilder builder = new URIBuilder();
        builder.setScheme("https").setHost("www.googleapis.com").setPath("/userinfo/v2/me")
            .setParameter("access_token", token);
        URI uri;
        try {
            uri = builder.build();
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }
        HttpGet getConnecton = new HttpGet(uri);
        try {
            getResponse = httpclient.execute(getConnecton);
        } catch (IOException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }

        HttpEntity getrEntity = getResponse.getEntity();

        String email = null;
        try {
            try (InputStream instream = getrEntity.getContent()) {
                String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode nodeResponse;
                try {
                    nodeResponse = mapper.readTree(jsonResponse);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                }
                email = nodeResponse.get("email").asText();
            } finally {
                getResponse.close();
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e1.getMessage()));
        }

        User authenticatedUser = authenticationService.getOauthUser(email);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        try {
            httpclient.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ModelAndView("redirect:/main?token=" + jwtToken);
    }

    @GetMapping("/code/github")
    public ModelAndView githubCode(@RequestParam String code, @RequestParam(required=false) String error) {
        if (error != null) {
            return new ModelAndView("redirect:/login?error=".concat(error));
        }

        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httppost = new HttpPost("https://github.com/login/oauth/access_token");

        List<NameValuePair> params = new ArrayList<NameValuePair>(4);
        params.add(new BasicNameValuePair("code", code));
        params.add(new BasicNameValuePair("client_id", githubClientId));
        params.add(new BasicNameValuePair("client_secret", githubClientSecret));
        params.add(new BasicNameValuePair("redirect_uri", githubRedirectUri));

        httppost.setHeader("Accept", "application/json");

        try {
            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        CloseableHttpResponse response;
        try {
            response = httpclient.execute(httppost);
        } catch (IOException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }
        
        HttpEntity entity = response.getEntity();

        String token = null;
        if (entity != null) {
            try (InputStream instream = entity.getContent()) {
                String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode nodeResponse;
                try {
                    nodeResponse = mapper.readTree(jsonResponse);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                }
                token = nodeResponse.get("access_token").asText();
            } catch (IOException e1) {
                e1.printStackTrace();
                return new ModelAndView("redirect:/login?error=".concat(e1.getMessage()));
            } finally {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        CloseableHttpResponse getResponse;
        URIBuilder builder = new URIBuilder();

        builder.setScheme("https").setHost("api.github.com").setPath("/user");
        URI uri;
        try {
            uri = builder.build();
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }
        HttpGet getConnecton = new HttpGet(uri);
        getConnecton.setHeader("Authorization", "Bearer " + token);
        try {
            getResponse = httpclient.execute(getConnecton);
        } catch (IOException e) {
            e.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
        }

        HttpEntity getrEntity = getResponse.getEntity();

        String email = null;
        try {
            try (InputStream instream = getrEntity.getContent()) {
                String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode nodeResponse;
                try {
                    nodeResponse = mapper.readTree(jsonResponse);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                }
                email = nodeResponse.get("login").asText();
            } finally {
                getResponse.close();
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            return new ModelAndView("redirect:/login?error=".concat(e1.getMessage()));
        }

        User authenticatedUser = authenticationService.getOauthUser(email);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        try {
            httpclient.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ModelAndView("redirect:/main?token=" + jwtToken);
    }

}
