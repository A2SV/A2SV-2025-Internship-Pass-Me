class LoginState {
  final String? token;
  final String? username;
  final String? email;
  final bool isLoading;
  final String? error;

  LoginState({
    this.token,
    this.username,
    this.email,
    this.isLoading = false,
    this.error,
  });

  // Add copyWith and other methods as needed
}
