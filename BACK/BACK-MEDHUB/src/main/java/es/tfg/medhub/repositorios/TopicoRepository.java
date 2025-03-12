package es.tfg.medhub.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import es.tfg.medhub.modelos.Topico;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase repositorio que implementa la interfaz JpaRepostiory para
 *         interaccionar con los datos de la base de datos relacionado a los
 *         topicos. Aunque no haya métodos implementados en esta interfaz una
 *         vez se extiende de Jpa hay unos métodos simples que podremos usar
 *         como findAll que encuentra todas las entradas en la base de datos o
 *         findById para encontrar por el id
 */
public interface TopicoRepository extends JpaRepository<Topico, Long> {

}
