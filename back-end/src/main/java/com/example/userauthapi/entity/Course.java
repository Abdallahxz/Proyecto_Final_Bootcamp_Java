package com.example.userauthapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Course name is mandatory")
    private String name;

    @NotBlank(message = "Course description is mandatory")
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Course startDate is mandatory")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;

    @Positive(message = "Course students count must be positive")
    private int students;

    @Positive(message = "Course duration must be positive")
    private int duration;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnore  // تجاهل الدروس عند تحويل الدورة إلى JSON لتجنب التكرار
    private List<Lesson> lessons;

    public Course() {}

    public Course(String name, String description, int duration, int students, Date startDate) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.students = students;
        this.startDate = startDate;
    }

    // Getters and setters for lessons
    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStudents() {
        return students;
    }

    public void setStudents(int students) {
        this.students = students;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
