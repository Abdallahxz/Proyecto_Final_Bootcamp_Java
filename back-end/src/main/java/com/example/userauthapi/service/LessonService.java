package com.example.userauthapi.service;

import com.example.userauthapi.entity.Lesson;
import com.example.userauthapi.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;

    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public Optional<Lesson> getLessonById(Long lessonId) {
        return lessonRepository.findById(lessonId);
    }

    public List<Lesson> getLessonsByCourse(Long courseId) {
        return lessonRepository.findAllByCourseId(courseId);
    }

    public void deleteLesson(Long lessonId) {
        lessonRepository.deleteById(lessonId);
    }

}
