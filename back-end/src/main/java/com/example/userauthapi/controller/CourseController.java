package com.example.userauthapi.controller;

import com.example.userauthapi.entity.Course;
import com.example.userauthapi.entity.Lesson;
import com.example.userauthapi.entity.Message;
import com.example.userauthapi.service.CourseService;
import com.example.userauthapi.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final MessageService messageService; // نضيف الـ MessageService لحفظ الرسائل

    public CourseController(CourseService courseService, MessageService messageService) {
        this.courseService = courseService;
        this.messageService = messageService; // حقن الـ MessageService
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageService.getAllMessages(); // استخدام MessageService لجلب جميع الرسائل
        return ResponseEntity.ok(messages); // إرجاع قائمة الرسائل
    }

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course newCourse = courseService.addCourse(course);
        return ResponseEntity.ok(newCourse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/{id}/lessons")
    public ResponseEntity<List<Lesson>> getCourseLessons(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        List<Lesson> lessons = course.getLessons();
        return ResponseEntity.ok(lessons);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        try {
            Course course = courseService.updateCourse(id, updatedCourse);
            return ResponseEntity.ok(course);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // إذا لم يتم العثور على الكورس
        }
    }

    @PostMapping("/send-message")
    public ResponseEntity<String> sendMessage(@RequestBody Message messageRequest) {

        if (messageRequest.getDate() == null) {
            messageRequest.setDate(new Date()); // أو LocalDate.now() إذا كنت تستخدم LocalDate
        }
        Long courseId = messageRequest.getCourseId();
        String subject = messageRequest.getSubject();
        String body = messageRequest.getBody();

        // التحقق من أن CourseId صالح
        Course course = courseService.getCourseById(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        // حفظ الرسالة في قاعدة البيانات
        Message message = new Message();
        message.setCourseId(courseId);
        message.setSubject(subject);
        message.setBody(body);
        messageService.saveMessage(message); // حفظ الرسالة باستخدام الـ MessageService

        return ResponseEntity.ok("Message sent and saved successfully.");
    }

}
