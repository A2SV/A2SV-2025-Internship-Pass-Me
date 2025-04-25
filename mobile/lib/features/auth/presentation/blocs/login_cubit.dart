import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/features/auth/domain/usecases/login_user.dart';
import 'package:dartz/dartz.dart'; // To work with Either
import 'package:mobile/core/errors/failures.dart'; // Assuming you have a Failure class

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
      final result = await loginUser(email, password);

      result.fold(
        (failure) {
          // Handle failure here
          emit(state.copyWith(isLoading: false, error: failure.toString()));
        },
        (user) {
          // Assuming the user object contains a token field
          final token = user.token;
          final username =
              user.username; // Get the actual username from the response

          emit(state.copyWith(
            isLoading: false,
            token: token, // Set the token here
            username: username,
            email: email,
          ));
        },
      );
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
