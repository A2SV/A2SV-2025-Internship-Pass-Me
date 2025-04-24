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

  // Add copyWith method for immutability
  LoginState copyWith({
    String? token,
    String? username,
    String? email,
    bool? isLoading,
    String? error,
  }) {
    return LoginState(
      token: token ?? this.token,
      username: username ?? this.username,
      email: email ?? this.email,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}
