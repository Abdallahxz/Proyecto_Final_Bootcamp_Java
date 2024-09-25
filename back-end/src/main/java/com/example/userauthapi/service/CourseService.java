package com.example.userauthapi.service;

import com.example.userauthapi.entity.Course;
import com.example.userauthapi.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        // ابحث عن الكورس باستخدام المعرف
        return courseRepository.findById(id).map(course -> {
            // تحديث البيانات
            course.setName(updatedCourse.getName());
            course.setDescription(updatedCourse.getDescription());
            course.setDuration(updatedCourse.getDuration());
            course.setStudents(updatedCourse.getStudents());
            course.setStartDate(updatedCourse.getStartDate());

            // حفظ الكورس بعد التعديل
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public Optional<Course> getCourse(Long id) {
        return courseRepository.findById(id);
    }

}
