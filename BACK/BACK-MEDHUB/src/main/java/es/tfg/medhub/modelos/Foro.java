package es.tfg.medhub.modelos;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author David Rodríguez Díaz
 * 
 *         Clase Foro heredera de Entrada para diferenciarla de la clase padre
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Foro extends Entrada {

    @NotNull
    @OneToMany(mappedBy = "foro")
    private List<RespuestaForo> respuestas;

}
