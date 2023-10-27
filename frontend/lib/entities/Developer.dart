class Developer {
  String id;
  String firstName;
  String lastName;
  String jobDescription;
  String imageUrl;
  num createdAt;

  Developer(
      {required this.id,
      required this.firstName,
      required this.lastName,
      required this.jobDescription,
      required this.imageUrl,
      required this.createdAt});

  factory Developer.fromJson(Map<String, dynamic> json) {
    return Developer(
      id: json['_id'] as String,
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      jobDescription: json['jobDescription'] as String,
      imageUrl: json['imageUrl'] as String,
      createdAt: (json['createdAt'] ?? 0) as num,
    );
  }
}
