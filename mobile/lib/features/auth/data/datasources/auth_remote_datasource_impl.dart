import 'auth_remote_datasource.dart';

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  @override
  Future<String> login(String email, String password) async {
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    if (email == "test@example.com" && password == "password") {
      return "token_123456";
    } else {
      throw Exception("Invalid credentials");
    }
  }

  @override
  Future<String> signUp({
    required String fullName,
    required String email,
    required String password,
  }) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 2));

    // Simulate API response: accept anything that's not test@example.com
    if (email != "test@example.com") {
      return "user_created_token_987654";
    } else {
      throw Exception("Email already exists");
    }
  }
}
