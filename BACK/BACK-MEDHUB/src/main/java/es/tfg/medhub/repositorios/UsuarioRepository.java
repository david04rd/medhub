package es.tfg.medhub.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.tfg.medhub.modelos.Usuario;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase repositorio que implementa la interfaz JpaRepostiory para
 *         interaccionar con los datos de la base de datos relacionado a los
 *         usuarios
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Aqui por ejemplo podemos determinar metodos especificos para que se busque
    // por un campo concreto (funcionan mientras dicho campo exista, y esto se
    // comprueba al extender de JpaRepository<Clase,Long> )
    
    Usuario findByEmail(String email);

    Usuario findByNombreUsuario(String nombreUsuario);

}