import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;

    @ManyToMany(mappedBy = "profesores")
    private Set<Curso> cursos = new HashSet<>();

    // Getters y setters
}