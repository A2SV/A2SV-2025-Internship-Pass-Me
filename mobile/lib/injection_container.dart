import 'package:get_it/get_it.dart';
import 'features/auth/domain/usecases/login_user.dart';
import 'features/auth/data/repositories/auth_repository_impl.dart';
import 'features/auth/data/datasources/auth_remote_datasource_impl.dart';
import 'features/auth/presentation/blocs/login_cubit.dart';
import 'features/auth/domain/repositories/auth_repository.dart';
import 'features/auth/data/datasources/auth_remote_datasource.dart';

final sl = GetIt.instance;

void init() {
  sl.registerFactory(() => LoginCubit(sl()));
  sl.registerLazySingleton(() => LoginUser(sl()));
  sl.registerLazySingleton<AuthRepository>(() => AuthRepositoryImpl(sl()));
  sl.registerLazySingleton<AuthRemoteDataSource>(() => AuthRemoteDataSourceImpl());
}