import '../../../../core/widgets/language_selector.dart';
import '../../domain/entites/Submission_entity.dart';
import '../../domain/entites/question.dart';
import '../../domain/repositories/question_repository.dart';
import '../datasource/question_remote_datasource.dart';
import '../models/submission_model.dart';

class QuestionRepositoryImpl implements QuestionRepository {
  final QuestionRemoteDataSource remoteDataSource;

  QuestionRepositoryImpl(this.remoteDataSource);

  @override
  Future<List<QuestionEntity>> getQuestions(Language language) async {
    final languageCode = language == Language.english ? 'en' : 'am';
    return await remoteDataSource.getQuestions(languageCode);
  }

  @override
  Future<void> submitAnswers(SubmissionEntity submission) async {
    // Convert SubmissionEntity to SubmissionModel before passing to data source
    final submissionModel = SubmissionModel(
        questions: submission.questions,
        flightDate: submission.flightDate,
        flightName: submission.flightName,
        destinationName: submission.destinationName,
        startName: submission.startName);
    await remoteDataSource.submitAnswers(submissionModel.toJson());
  }
}
