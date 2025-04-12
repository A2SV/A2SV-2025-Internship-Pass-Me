import 'package:dartz/dartz.dart';
import 'package:mobile/core/errors/failures.dart';
import 'package:mobile/features/auth/domain/entities/user.dart';

import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl(this.remoteDataSource);

  @override
  Future<String> login(String email, String password) {
    return remoteDataSource.login(email, password);
  }

  @override
  Future<Either<Failure, User>> signUp(
    String email,
    String password,
    String fullName,
  ) async {
    try {
      final token = await remoteDataSource.signUp(
        fullName: fullName,
        email: email,
        password: password,
      );

      // You may construct a User from token or simulate one for now
      final user = User(
        id: token, // using token as ID for now
        fullName: fullName,
        email: email,
      );

      return Right(user);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}
