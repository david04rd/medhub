package es.tfg.medhub.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import es.tfg.medhub.modelos.EntradaBiblioteca;

public interface EntradaBibliotecaRepository extends JpaRepository<EntradaBiblioteca, Long> { 

    List<EntradaBiblioteca> findByTipoEntradaBiblioteca(String tipoEntradaBiblioteca);

}
