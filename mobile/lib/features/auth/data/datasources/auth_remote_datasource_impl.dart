import 'auth_remote_datasource.dart';

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  @override
  Future<String> login(String email, String password) async {
    // Simulate API call
    await Future.delayed(Duration(seconds: 2));
    if (email == "test@example.com" && password == "password") {
      return "token_123456";
    } else {
      throw Exception("Invalid credentials");
    }
  }
}