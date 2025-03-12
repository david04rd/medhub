package es.tfg.medhub.modelos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author David Rodríguez Díaz
 *         Entidad para el registro de entradas en la base de datos
 * 
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class EntradaBiblioteca {

    @Id
    @Column(name = "id_entrada")
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    // Atributo que almacena la portada insertada en la base de datos.
    @Lob
    @Column(name = "portada", columnDefinition = "MEDIUMBLOB")
    private byte[] portada;

    @NotNull
    @Column(name = "nombre_entrada")
    private String nombreEntrada;

    @NotNull
    @Column(name = "contenido")
    private String contenido;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "autor_id", referencedColumnName = "id")
    private Usuario autor;

    @NotNull
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @NotNull
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "ultimo_autor_actualizacion_id", referencedColumnName = "id")
    @JsonIgnore
    private Usuario ultimoAutorActualizacion;

    @NotNull
    @Column(name = "tipo_entrada_biblioteca")
    private String tipoEntradaBiblioteca;

}
