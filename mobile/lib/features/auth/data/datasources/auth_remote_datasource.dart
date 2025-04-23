abstract class AuthRemoteDataSource {
  Future<String> login(String email, String password);

  /// Registers a new user and returns a token
  Future<String> signUp({
    required String username,
    required String email,
    required String password,
  });
}
