package com.example.userauthapi.controller;

import com.example.userauthapi.entity.Course;
import com.example.userauthapi.entity.Lesson;
import com.example.userauthapi.service.CourseService;
import com.example.userauthapi.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long lessonId) {
        Optional<Lesson> lessonOptional = lessonService.getLessonById(lessonId);
        if (lessonOptional.isPresent()) {
            return ResponseEntity.ok(lessonOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // في حالة عدم العثور على الدرس
        }
    }

    @PutMapping("/{lessonId}/update")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long lessonId, @RequestBody Lesson updatedLesson) {
        Optional<Lesson> lessonOptional = lessonService.getLessonById(lessonId);
        if (lessonOptional.isPresent()) {
            Lesson existingLesson = lessonOptional.get();
            // تحديث الخصائص المطلوبة
            existingLesson.setTitle(updatedLesson.getTitle());
            existingLesson.setDescription(updatedLesson.getDescription());
            existingLesson.setDate(updatedLesson.getDate());
            existingLesson.setContent(updatedLesson.getContent());

            Lesson savedLesson = lessonService.saveLesson(existingLesson);
            return ResponseEntity.ok(savedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // في حالة عدم العثور على الدرس
        }
    }


    @PostMapping("/{courseId}/add")
    public ResponseEntity<Lesson> addLesson(@PathVariable Long courseId, @RequestBody Lesson lesson) {
        Optional<Course> courseOptional = courseService.getCourse(courseId);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            lesson.setCourse(course);  // ربط الدرس بالدورة
            Lesson savedLesson = lessonService.saveLesson(lesson);
            return ResponseEntity.ok(savedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // في حالة عدم العثور على الدورة
        }
    }

    @DeleteMapping("/{lessonId}/delete")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long lessonId) {
        Optional<Lesson> lessonOptional = lessonService.getLessonById(lessonId);
        if (lessonOptional.isPresent()) {
            lessonService.deleteLesson(lessonId); // دالة للحذف في الخدمة
            return ResponseEntity.noContent().build(); // إرجاع حالة 204 No Content
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // في حالة عدم العثور على الدرس
        }
    }


}
