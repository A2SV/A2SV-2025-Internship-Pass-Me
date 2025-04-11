import '../repositories/auth_repository.dart';

class LoginUser {
  final AuthRepository repository;

  LoginUser(this.repository);

  Future<String> call(String email, String password) async {
    return repository.login(email, password);
  }
}