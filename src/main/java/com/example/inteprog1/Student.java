package com.example.inteprog1;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long stud_id;
 
    
    private String stud_name;
    
    private Long age;
    private String course;

    
    public Long getStud_id() {
        return stud_id;
    }
    public String getStud_name() {
        return stud_name;
    }
    public void setStud_name(String stud_name) {
        this.stud_name = stud_name;
    }
    public Long getAge() {
        return age;
    }
    public void setAge(Long age) {
        this.age = age;
    }
    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }


    
}
