package es.tfg.medhub.controladores;

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
 *         Clase controlador para el registro de la aplicación. Se le inyecta el
 *         repositorio del usuario para la consolidación del usuario en la base
 *         de datos
 */
@RestController
@RequestMapping("/registro")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroController {

    @Autowired
    private UsuarioRepository userRepository;

    // Recibe un usuario por parámetro y lo almacena en la base de datos, para luego
    // devolver una respuesta correcta con el estado para que el front sea
    // notificado
    @PostMapping("/registrarUsuario")
    public ResponseEntity<Map<String, String>> registro(@RequestBody Usuario user) {

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("OK", "200");

        return ResponseEntity.ok(response);

    }

    // Compruebo si el email esta registrado en la base de datos y devuelve un
    // booleano en la respuesta basado en el resultado de la consulta al repositorio
    @PostMapping("/comprobarEmail")
    public ResponseEntity<Boolean> emailIsRegistrado(@RequestBody Usuario user) {

        Usuario usuario = userRepository.findByEmail(user.getEmail());

        if (usuario != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(true);
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(false);
        }
    }

    // Compruebo si el nombre de usuario esta registrado en la base de datos y según
    // lo que encuentre devuelvo un booleano en la respuesta
    @PostMapping("/comprobarUsuario")
    public ResponseEntity<Boolean> nombreUsuarioIsRegistrado(@RequestBody Usuario user) {
        Usuario usuario = userRepository.findByNombreUsuario(user.getNombreUsuario());

        if (usuario != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(true);
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(false);
        }
    }

}
