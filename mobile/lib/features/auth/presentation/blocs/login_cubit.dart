import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/features/auth/domain/usecases/login_user.dart';

class LoginState {
  final bool isLoading;
  final String? error;
  final String? token;
  final String? username; // Added username field
  final String? email; // Added email field

  LoginState({
    this.isLoading = false,
    this.error,
    this.token,
    this.username,
    this.email,
  });

  LoginState copyWith({
    bool? isLoading,
    String? error,
    String? token,
    String? username,
    String? email,
  }) {
    return LoginState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      token: token ?? this.token,
      username: username ?? this.username,
      email: email ?? this.email,
    );
  }
}

class LoginCubit extends Cubit<LoginState> {
  final LoginUser loginUser;

  LoginCubit(this.loginUser) : super(LoginState());

  Future<void> login(String email, String password) async {
    emit(state.copyWith(isLoading: true, error: null));
    try {
      final token = await loginUser(email, password);

      // Assuming the loginUser use case returns a token and user details
      final username =
          "kitessa"; // Replace with actual username from the response
      emit(state.copyWith(
        isLoading: false,
        token: token,
        username: username,
        email: email,
      ));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
