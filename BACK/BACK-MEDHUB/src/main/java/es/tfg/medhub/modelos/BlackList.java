package es.tfg.medhub.modelos;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author David Rodríguez Díaz
 * 
 *         Entidad para el registro de usuarios vetados en la base de datos
 */
@Entity
@Table(name = "black_list")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class BlackList {

    @Id
    @Column(name = "idRespuesta")
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "motivo")
    private String motivo;

    @NotNull
    @Column(name = "fecha_veto")
    private LocalDateTime fechaVeto;

}
