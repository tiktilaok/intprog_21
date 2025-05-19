package com.example.inteprog1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.inteprog1.Student;

public interface StudentRepository extends CrudRepository<Student, Long> {
    
}
