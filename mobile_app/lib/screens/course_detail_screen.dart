import 'package:flutter/material.dart';

class CourseDetailScreen extends StatelessWidget {
  final String courseTitle;

  const CourseDetailScreen({super.key, required this.courseTitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(courseTitle),
        backgroundColor: const Color(0xFF0F172A),
      ),
      body: const Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Instructor Office Hours: Tue/Thu 2-4 PM', style: TextStyle(color: Colors.white70)),
            SizedBox(height: 12),
            Text('Textbook: Discrete Math and Its Applications', style: TextStyle(color: Colors.white70)),
          ],
        ),
      ),
    );
  }
}
