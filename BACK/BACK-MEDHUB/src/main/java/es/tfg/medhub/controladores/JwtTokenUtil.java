package es.tfg.medhub.controladores;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * @author David Rodríguez Díaz
 * 
 *         Esta clase es la encargada de crear el token JWT que se enviará al
 *         front-end en Angular para mantener la sesión del usuario abierta
 *         mientras navega por la aplicación web
 */
@Component
@CrossOrigin(origins = "http://localhost:4200")
public class JwtTokenUtil {

    private long expiration = 86400000;

    public String generateToken(String email) {

        // Los tokens JWT tienen una duración por lo que necesitan de la fecha en la que
        // se crea dicho token para crear la fecha de expiración de este.
        
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();

        return token;
    }
}
