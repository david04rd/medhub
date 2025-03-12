package es.tfg.medhub.controladores;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.tfg.medhub.modelos.Entrada;
import es.tfg.medhub.modelos.Topico;
import es.tfg.medhub.repositorios.EntradaRepository;
import es.tfg.medhub.repositorios.TopicoRepository;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase controlador para el manejo de topicos en la aplicacion. Se
 *         implementa el repositorio de topico para las interacciones con la
 *         entidad en la base de datos
 */
@RestController
@RequestMapping("/topicos")
@CrossOrigin(origins = "http://localhost:4200")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    // Obtiene todos los topicos registrados en la base de datos y los envia al
    // front
    @GetMapping("/obtenerTopicos")
    public ResponseEntity<List<Topico>> getNoticias() {
        List<Topico> noticias = topicoRepository.findAll();
        return ResponseEntity.ok(noticias);
    }

    // Borra un topico de cada entrada asociada y lo elimina de la base de datos
    @DeleteMapping("/borrarTopico/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> borrarTopico(@PathVariable Long id) {
        Optional<Topico> topicoOptional = topicoRepository.findById(id);
        if (!topicoOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Topico topico = topicoOptional.get();

        // Elimino el topico de la lista de tópicos asociados en cada entrada
        List<Entrada> entradasConEsteTopico = entradaRepository.findByTopicosAsociadosContaining(topico);
        for (Entrada entrada : entradasConEsteTopico) {
            entrada.getTopicosAsociados().remove(topico);
            entradaRepository.save(entrada);
        }

        topicoRepository.delete(topico);

        return ResponseEntity.ok().build();
    }

    // Actualiza los datos de un topico
    @PutMapping("/actualizarTopico/{id}")
    public ResponseEntity<?> actualizarTopico(@PathVariable Long id, @RequestBody Topico topicoActualizado) {
        Optional<Topico> topicoOptional = topicoRepository.findById(id);
        if (!topicoOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Topico topico = topicoOptional.get();

        // Actualizar los campos del tópico con los valores del tópico actualizado
        topico.setNombreTopico(topicoActualizado.getNombreTopico());
        topico.setDescripcion(topicoActualizado.getDescripcion());
        topico.setFechaActualizacion(LocalDateTime.now());
        topico.setUltimoAutorActualizacion(topicoActualizado.getUltimoAutorActualizacion());

        topicoRepository.save(topico);

        return ResponseEntity.ok().build();
    }

}
