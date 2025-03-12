package es.tfg.medhub.modelos;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * @author David Rodríguez Díaz
 * 
 *         Esta clase pese a ser exactamente igual a Entrada debe ser creada ya
 *         que todas las entidades que hereden de Entrada comparten una tabla y
 *         se diferencian mediante un campo autogenerado llamado DTYPE que se
 *         determina por el DiscriminatorValue. Los atributos de tablas con más
 *         atributos como puede ser Foro se verán reflejados en otras tablas
 */
@Entity
@DiscriminatorValue("Noticia")
public class Noticia extends Entrada {
}