import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/features/auth/domain/usecases/login_user.dart';

class LoginState {
  final bool isLoading;
  final String? error;
  final String? token;

  LoginState({this.isLoading = false, this.error, this.token});

  LoginState copyWith({bool? isLoading, String? error, String? token}) {
    return LoginState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      token: token,
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
      emit(state.copyWith(isLoading: false, token: token));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
