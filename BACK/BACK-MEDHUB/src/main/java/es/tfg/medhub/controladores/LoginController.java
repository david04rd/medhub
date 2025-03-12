package es.tfg.medhub.controladores;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.tfg.medhub.modelos.Usuario;
import es.tfg.medhub.repositorios.UsuarioRepository;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase controlador para el login. Tiene inyectados los repositorios de
 *         usuario para comprobar si el usuario esta registrado en la base de
 *         datos y si las contraseñas coinciden.
 *         Además tiene el repositorio de JWT inyectado para generar el token
 *         personalizado JWT y enviarlo al front end
 */
@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private UsuarioRepository userRepository;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@RequestBody Usuario user) {

        // Obtengo el usuario del repositorio por el nombre de usuario
        Usuario usuario = userRepository.findByNombreUsuario(user.getNombreUsuario());

        // Compruebo que el usuario no sea nulo y que las contraseñas coincidan
        if (usuario != null && usuario.getContrasenna().equals(user.getContrasenna())) {

            //Genero el token de JWT personalizado enviando el email como parámetro
            String token = jwtTokenUtil.generateToken(user.getEmail());

            //Genero la respuesta que enviare al front
            Map<String, Object> response = new HashMap<>();

            //Coloco tanto token como usuario en la respuesta para que se traten en el front
            response.put("token", token);
            response.put("usuario", usuario);

            //Envio la respuesta
            return ResponseEntity.ok(response);
        } else {
            //Devuelvo una respuesta erronea en caso de error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
        }
    }

}
