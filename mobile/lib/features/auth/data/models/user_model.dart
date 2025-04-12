import '../../domain/entities/user.dart';

class UserModel extends User {
  final String token;

  UserModel({
    required String id,
    required String fullName,
    required String email,
    required this.token,
  }) : super(id: id, fullName: fullName, email: email);

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      fullName: json['fullName'] ?? '',
      email: json['email'] ?? '',
      token: json['token'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'fullName': fullName,
      'email': email,
      'token': token,
    };
  }
}
