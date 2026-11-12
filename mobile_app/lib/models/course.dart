class Course {
  final String code;
  final String name;
  final String time;
  final String room;
  final String instructor;
  final int credits;

  const Course({
    required this.code,
    required this.name,
    required this.time,
    required this.room,
    required this.instructor,
    required this.credits,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      code: json['code'] as String,
      name: json['name'] as String,
      time: json['time'] as String,
      room: json['room'] as String,
      instructor: json['instructor'] as String,
      credits: json['credits'] as int,
    );
  }
}