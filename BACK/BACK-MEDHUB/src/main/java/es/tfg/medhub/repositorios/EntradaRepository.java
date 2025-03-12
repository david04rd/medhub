package es.tfg.medhub.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import es.tfg.medhub.modelos.Entrada;
import es.tfg.medhub.modelos.Topico;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase repositorio que implementa la interfaz JpaRepostiory para
 *         interaccionar con los datos de la base de datos relacionado a las
 *         noticias
 */
@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Long> {

    List<Entrada> findByTopicosAsociadosContaining(Topico topico);

    // @Query se usa para crear sentencias SQL nativas

    @Query(value = "SELECT * FROM Entrada e WHERE e.dtype = 'Noticia' ORDER BY e.fecha_creacion DESC", nativeQuery = true)
    List<Entrada> findNoticiasOrderByFechaCreacionDesc();

    @Query(value = "SELECT * FROM Entrada e WHERE e.dtype = 'Noticia' ORDER BY e.fecha_creacion DESC LIMIT 3", nativeQuery = true)
    List<Entrada> findNoticiasRecientes();

}
