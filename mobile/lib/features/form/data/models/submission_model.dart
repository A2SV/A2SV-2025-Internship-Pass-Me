import 'package:mobile/features/form/domain/entites/Submission_entity.dart';

class SubmissionModel extends SubmissionEntity {
  const SubmissionModel({
    required super.questions,
    required super.flightDate,
    required super.flightName,
    required super.startName,
    required super.destinationName,
  });

  factory SubmissionModel.fromEntity(SubmissionEntity entity) {
    return SubmissionModel(
      questions: entity.questions,
      flightDate: entity.flightDate,
      flightName: entity.flightName,
      startName: entity.startName,
      destinationName: entity.destinationName,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'questions': questions
          .map((q) => {
                'id': q.id,
                'questionText': q.questionText,
                'answer': q.answer,
                // Include any other question fields you need to serialize
              })
          .toList(),
      'flightDate': flightDate.toIso8601String(),
      'flightName': flightName,
      'startName': startName,
      'destinationName': destinationName,
    };
  }
}
