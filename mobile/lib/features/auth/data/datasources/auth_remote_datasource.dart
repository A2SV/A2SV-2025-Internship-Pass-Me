abstract class AuthRemoteDataSource {
  Future<String> login(String email, String password);

  /// Registers a new user and returns a user ID or token
  Future<String> signUp({
    required String fullName,
    required String email,
    required String password,
  });
}
