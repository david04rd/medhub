package es.tfg.medhub.controladores;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.tfg.medhub.modelos.EntradaBiblioteca;
import es.tfg.medhub.modelos.Usuario;
import es.tfg.medhub.repositorios.EntradaBibliotecaRepository;
import es.tfg.medhub.repositorios.UsuarioRepository;

@RestController
@RequestMapping("/serv-biblioteca")
@CrossOrigin(origins = "http://localhost:4200")
public class EntradaBibliotecaController {

    @Autowired
    private EntradaBibliotecaRepository bibliotecaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Devuelve la lista de entradas de la biblioteca por el tipo de entrada
    @GetMapping("/entradasBibliotecas/{tipoEntradaBiblioteca}")
    public ResponseEntity<List<EntradaBiblioteca>> getEntradasBibliotecaByTipoEntradaBiblioteca(
            @PathVariable String tipoEntradaBiblioteca) {
        List<EntradaBiblioteca> entradasBibliotecaPorTipo = bibliotecaRepository
                .findByTipoEntradaBiblioteca(tipoEntradaBiblioteca);
        return ResponseEntity.ok(entradasBibliotecaPorTipo);
    }

    // Obtiene una entrada de biblioteca por id
    @GetMapping("/entradaBiblioteca/{id}")
    public ResponseEntity<EntradaBiblioteca> getEntradaBibliotecaById(@PathVariable("id") Long id) {

        // Debido a que los repositorios no saben si los datos son veraces y como se
        // debe de devolver siempre una respuesta realizo la comprobación de isPresent
        // para comprobar que exista, aunque ya se comprueba la existencia en el
        // front,porque si no no se podría acceder a este endpoint/url

        Optional<EntradaBiblioteca> noticia = bibliotecaRepository.findById(id);
        if (noticia.isPresent()) {
            return ResponseEntity.ok(noticia.get());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Borra la entrada de la biblioteca por el id
    @DeleteMapping("/deleteEntradaBiblioteca/{id}")
    public ResponseEntity<String> deleteEntradaBiblioteca(@PathVariable Long id) {
        try {

            bibliotecaRepository.deleteById(id);

            return ResponseEntity.ok("Entrada eliminada correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la entrada.");
        }
    }

    // Método que almacena una entrada de biblioteca
    @PostMapping("/sendEntradaBiblioteca")
    public ResponseEntity<EntradaBiblioteca> sendEntradaBiblioteca(
            @RequestParam("nombreEntrada") String nombreEntrada,
            @RequestParam("contenido") String contenido,
            @RequestParam("autorId") Long autorId,
            @RequestParam("fechaCreacion") String fechaCreacionStr,
            @RequestParam("fechaActualizacion") String fechaActualizacionStr,
            @RequestParam("ultimoAutorActualizacionId") Long ultimoAutorActualizacionId,
            @RequestParam("tipoEntradaBiblioteca") String tipoEntradaBiblioteca,
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

            // Crear la entrada de biblioteca
            EntradaBiblioteca entradaBiblioteca = new EntradaBiblioteca();
            entradaBiblioteca.setNombreEntrada(nombreEntrada);
            entradaBiblioteca.setContenido(contenido);
            entradaBiblioteca.setAutor(autor);
            entradaBiblioteca.setFechaCreacion(fechaCreacion);
            entradaBiblioteca.setFechaActualizacion(fechaActualizacion);
            entradaBiblioteca.setUltimoAutorActualizacion(ultimoAutorActualizacion);
            entradaBiblioteca.setTipoEntradaBiblioteca(tipoEntradaBiblioteca);

            // Asignar la portada si existe
            if (portada != null && !portada.isEmpty()) {
                entradaBiblioteca.setPortada(portada.getBytes());
            }

            // Guardar la entrada de biblioteca en la base de datos
            EntradaBiblioteca savedEntradaBiblioteca = bibliotecaRepository.save(entradaBiblioteca);

            // Devolver la entrada de biblioteca guardada
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEntradaBiblioteca);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
