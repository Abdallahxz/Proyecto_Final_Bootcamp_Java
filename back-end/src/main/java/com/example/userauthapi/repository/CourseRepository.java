package com.example.userauthapi.repository;

import com.example.userauthapi.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // يمكنك إضافة استعلامات مخصصة هنا إذا لزم الأمر

}
