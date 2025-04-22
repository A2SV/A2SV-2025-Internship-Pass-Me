import 'package:get_it/get_it.dart';
import 'package:mobile/features/auth/domain/usecases/sign_up_usecase.dart';
import 'package:mobile/features/auth/presentation/blocs/sign_up_bloc.dart';
import 'package:mobile/features/form/data/datasource/question_remote_datasource.dart';
import 'package:mobile/features/form/data/repositories/question_repository_impl.dart';
import 'package:mobile/features/form/domain/repositories/question_repository.dart';
import 'package:mobile/features/form/domain/usecases/get_questions.dart';
import 'package:mobile/features/form/domain/usecases/submit_Answer.dart';
import 'package:mobile/features/form/presentation/blocs/form_bloc.dart';
import 'features/auth/domain/usecases/login_user.dart';
import 'features/auth/data/repositories/auth_repository_impl.dart';
import 'features/auth/data/datasources/auth_remote_datasource_impl.dart';
import 'features/auth/presentation/blocs/login_cubit.dart';
import 'features/auth/domain/repositories/auth_repository.dart';
import 'features/auth/data/datasources/auth_remote_datasource.dart';

final sl = GetIt.instance;

void init() {
  // Initialize Auth Feature
  _initAuth();

  // Initialize Form Feature
  _initForm();
}

void _initAuth() {
  // Auth Data Sources
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(),
  );

  // Auth Repositories
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(sl()),
  );

  // Auth Use Cases
  sl.registerLazySingleton(() => LoginUser(sl()));
  sl.registerLazySingleton(() => SignUpUseCase(sl()));

  // Auth BLoCs/Cubits
  sl.registerFactory(() => LoginCubit(sl()));
  sl.registerFactory(() => SignUpBloc(sl()));
}

void _initForm() {
  // Form Data Sources
  sl.registerLazySingleton<QuestionRemoteDataSource>(
    () => QuestionRemoteDataSourceImpl(),
  );

  // Form Repositories
  sl.registerLazySingleton<QuestionRepository>(
    () => QuestionRepositoryImpl(sl()),
  );

  // Form Use Cases
  sl.registerLazySingleton(() => GetQuestionsUseCase(sl()));
  sl.registerLazySingleton(() => SubmitAnswersUseCase(sl()));

  // Form BLoC
  sl.registerFactory(() => FormBloc(questionRepository: sl()));
}
