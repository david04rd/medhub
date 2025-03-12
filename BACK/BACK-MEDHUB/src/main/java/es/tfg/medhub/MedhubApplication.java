package es.tfg.medhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MedhubApplication {

	// Clase que al ejecutarse inicia el back end (apartado del servidor) de la
	// aplicacion
	public static void main(String[] args) {
		SpringApplication.run(MedhubApplication.class, args);
	}

}
