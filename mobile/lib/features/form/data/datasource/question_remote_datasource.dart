import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'package:mobile/features/form/data/models/question_model.dart';

abstract class QuestionRemoteDataSource {
  Future<List<QuestionModel>> getQuestions(String languageCode);
  Future<void> submitAnswers(Map<String, dynamic> data);
}

class QuestionRemoteDataSourceImpl implements QuestionRemoteDataSource {
  @override
  Future<List<QuestionModel>> getQuestions(String languageCode) async {
    final jsonString =
        await rootBundle.loadString('assets/questions_$languageCode.json');
    print(jsonString);
    final List decoded = jsonDecode(jsonString);
    return decoded.map((e) => QuestionModel.fromJson(e)).toList();
  }

  @override
  Future<void> submitAnswers(Map<String, dynamic> data) async {
    // This is where you'd send the data to your backend
    print("Sending submission data to server...");
    print(jsonEncode(data));
    // e.g. await http.post(url, body: jsonEncode(data));
  }
}
