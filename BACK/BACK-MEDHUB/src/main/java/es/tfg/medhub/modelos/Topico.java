package es.tfg.medhub.modelos;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author David Rodríguez Díaz
 * 
 * Clase para almacenar los topicos en la base de datos
 */
@Entity
@Table(name = "topico")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Topico {

    @Id
    @Column(name = "idTopico")
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @NotNull
    @Column(name = "nombreTopico")
    private String nombreTopico;

    @NotNull
    @Column(name = "descripcion")
    private String descripcion;

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
    private Usuario ultimoAutorActualizacion;

}
