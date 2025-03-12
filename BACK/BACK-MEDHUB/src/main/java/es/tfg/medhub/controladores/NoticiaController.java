package es.tfg.medhub.controladores;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.tfg.medhub.modelos.Entrada;
import es.tfg.medhub.modelos.Noticia;
import es.tfg.medhub.modelos.Topico;
import es.tfg.medhub.modelos.Usuario;
import es.tfg.medhub.repositorios.EntradaRepository;
import es.tfg.medhub.repositorios.TopicoRepository;
import es.tfg.medhub.repositorios.UsuarioRepository;

import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase controlador para todas las interacciones relacionadas con la
 *         entidad Noticia. Tiene inyectados el repositorio de noticias para
 *         realizar todas las consultas a la base de datos.
 *         También tiene el usuario repositorio de usuario ya que lo
 *         necesitaremos para algunas gestiones al igual que el de tópico, para
 *         devolver listas de noticias filtradas por tópicos ordenados.
 */
@RestController
@RequestMapping("/serv-noticias")
@CrossOrigin(origins = "http://localhost:4200")
public class NoticiaController {

    @Autowired
    private EntradaRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TopicoRepository topicoRepository;

    // Devuelve la lista de noticias ordenadas por fecha de creación descendente
    @GetMapping("/noticias")
    public ResponseEntity<List<Entrada>> getNoticias() {
        List<Entrada> noticias = repository.findNoticiasOrderByFechaCreacionDesc();
        return ResponseEntity.ok(noticias);
    }

    // Obtiene las tres primeras noticias por orden de creación descendente
    @GetMapping("/noticiasRecientes")
    public ResponseEntity<List<Entrada>> getNoticiasRecientes() {
        List<Entrada> noticias = repository.findNoticiasRecientes();
        return ResponseEntity.ok(noticias);
    }

    // Obtiene una noticia por id
    @GetMapping("/noticia/{id}")
    public ResponseEntity<Entrada> getNoticiaById(@PathVariable("id") Long id) {

        // Debido a que los repositorios no saben si los datos son veraces y como se
        // debe de devolver siempre una respuesta realizo la comprobación de isPresent
        // para comprobar que exista, aunque ya se comprueba la existencia en el
        // front,porque si no no se podría acceder a este endpoint/url

        Optional<Entrada> noticia = repository.findById(id);
        if (noticia.isPresent()) {
            return ResponseEntity.ok(noticia.get());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Borra la noticia por el id
    @DeleteMapping("/deleteNoticia/{id}")
    public ResponseEntity<String> deleteNoticia(@PathVariable Long id) {
        try {

            // Debido a que los repositorios no saben si los datos son veraces y como se
            // debe de devolver siempre una respuesta realizo la comprobación de isPresent
            // para comprobar que exista, aunque ya se comprueba la existencia en el
            // front,porque si no no se podría acceder a este endpoint/url

            Optional<Entrada> entradaOptional = repository.findById(id);
            if (entradaOptional.isPresent()) {

                // Para borrar una entrada primero debo de eliminar todos los tópicos asociados
                // a dicha entrada asi que hago el get del objeto Optional y hago un clear para
                // eliminar todas las entradas asociadas a los topicos

                Entrada entrada = entradaOptional.get();
                entrada.getTopicosAsociados().clear();

                // Guardo cambios en la BD
                repository.save(entrada);

                // Eliminar la entrada de la tabla Entrada
                repository.deleteById(id);

                return ResponseEntity.ok("Entrada eliminada correctamente.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la entrada.");
        }
    }

    // Método que almacena una noticia
    @PostMapping("/sendNoticia")
    public ResponseEntity<Entrada> sendNoticia(
            @RequestParam("nombreEntrada") String nombreEntrada,
            @RequestParam("contenido") String contenido,
            @RequestParam("autorId") Long autorId,
            @RequestParam("fechaCreacion") String fechaCreacionStr,
            @RequestParam("fechaActualizacion") String fechaActualizacionStr,
            @RequestParam("ultimoAutorActualizacionId") Long ultimoAutorActualizacionId,
            @RequestParam("topicosAsociados") String idTopicos,
            @RequestParam(value = "portada", required = false) MultipartFile portada) {

        try {
            // Convierto las fechas de String a LocalDateTime para poder tratar los datos
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime fechaCreacion = LocalDateTime.parse(fechaCreacionStr, formatter);
            LocalDateTime fechaActualizacion = LocalDateTime.parse(fechaActualizacionStr, formatter);

            // Buscar al autor por ID
            Usuario autor = usuarioRepository.findById(autorId)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            // Buscar al autor por ID
            Usuario ultimoAutorActualizacion = usuarioRepository.findById(ultimoAutorActualizacionId)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Buscar tópicos por ID
            List<Topico> topicosAsociados = new ArrayList<Topico>();

            // Debido a que desde el front se envian solo los ids de los tópicos asociados
            // en una cadena primero limpio la cadena de los carácteres especiales y obtengo
            // los ids de cada uno haciendo un split

            idTopicos = idTopicos.substring(1, idTopicos.length() - 1); // Eliminar corchetes al principio y al final
            String[] valores = idTopicos.split(","); // Separar por comas

            // Aquí convierto cada valor en Long (el repositorio requiere de un long por
            // parametros porque asi se determinan al usar JPARepository)
            for (String valor : valores) {
                long numero = Long.parseLong(valor.trim());

                Optional<Topico> topicoOptional = topicoRepository.findById(numero);

                // Verifico si el topico existe en el repositorio
                if (topicoOptional.isPresent()) {

                    // Agrego el tópico a la lista
                    topicosAsociados.add(topicoOptional.get());
                }
            }

            // Creo la entrada inicializando los valores con set
            Entrada entrada = new Noticia();
            entrada.setNombreEntrada(nombreEntrada);
            entrada.setContenido(contenido);
            entrada.setAutor(autor);
            entrada.setFechaCreacion(fechaCreacion);
            entrada.setFechaActualizacion(fechaActualizacion);

            // Cuando se acaba de crear la noticia como nadie la ha
            // modificado se asigna al usuario creador
            entrada.setUltimoAutorActualizacion(ultimoAutorActualizacion);

            entrada.setTopicosAsociados(topicosAsociados);

            // Como la portada es nulable, solo se inicializa si se encuentran datos.
            if (portada != null && !portada.isEmpty()) {
                entrada.setPortada(portada.getBytes());
            }

            // Guardo la entrada en la base de datos
            Entrada savedEntrada = repository.save(entrada);

            // Devuelvo una respuesta
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEntrada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
