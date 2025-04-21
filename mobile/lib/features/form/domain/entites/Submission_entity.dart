import 'package:mobile/features/form/domain/entites/question.dart';

class SubmissionEntity {
  final List<QuestionEntity> questions;
  final DateTime flightDate;
  final String flightName;
  final String startName;
  final String destinationName;

  const SubmissionEntity({
    required this.questions,
    required this.flightDate,
    required this.flightName,
    required this.startName,
    required this.destinationName,
  });

  // Creates a copy with updated value
  SubmissionEntity copyWith({
    List<QuestionEntity>? questions,
    DateTime? flightDate,
    String? flightName,
    String? startName,
    String? destinationName,
  }) {
    return SubmissionEntity(
      questions: questions ?? this.questions,
      flightDate: flightDate ?? this.flightDate,
      flightName: flightName ?? this.flightName,
      startName: startName ?? this.startName,
      destinationName: destinationName ?? this.destinationName,
    );
  }

  // Converts to Map
  Map<String, dynamic> toMap() {
    return {
      'questions': questions.map((q) => q.toMap()).toList(),
      'flightDate': flightDate.toIso8601String(),
      'flightName': flightName,
      'startName': startName,
      'destinationName': destinationName,
    };
  }

  // Creates from Map
  factory SubmissionEntity.fromMap(Map<String, dynamic> map) {
    return SubmissionEntity(
      questions: (map['questions'] as List)
          .map((q) => QuestionEntity.fromMap(q))
          .toList(),
      flightDate: DateTime.parse(map['flightDate'] as String),
      flightName: map['flightName'] as String,
      startName: map['startName'] as String,
      destinationName: map['destinationName'] as String,
    );
  }

  // Optional JSON methods for compatibility
  Map<String, dynamic> toJson() => toMap();
  factory SubmissionEntity.fromJson(Map<String, dynamic> json) =>
      SubmissionEntity.fromMap(json);

  @override
  int get hashCode {
    return questions.hashCode ^
        flightDate.hashCode ^
        flightName.hashCode ^
        startName.hashCode ^
        destinationName.hashCode;
  }
}
