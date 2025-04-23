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
    String username,
  ) async {
    try {
      final token = await remoteDataSource.signUp(
        username: username,
        email: email,
        password: password,
      );

      // Create a user from the token and username
      final user = User(
        id: token, // using token as ID for now
        username: username,
        email: email,
      );

      return Right(user);
    } catch (e) {
      // If it's a specific error about email existing, return that
      if (e.toString().contains('Email already exists')) {
        return Left(ServerFailure('Email already exists'));
      }
      return Left(ServerFailure(e.toString()));
    }
  }
}
