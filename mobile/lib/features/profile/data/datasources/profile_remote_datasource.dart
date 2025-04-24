// lib/data/datasources/profile_remote_data_source.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/core/service/local_storage_service.dart';
import '../models/profile_model.dart';

class ProfileRemoteDataSource {
  final String baseUrl;
  final http.Client client;
  final LocalStorageService localStorageService;

  ProfileRemoteDataSource({
    required this.baseUrl,
    required this.client,
    required this.localStorageService,
  });

  Future<ProfileModel> getProfile() async {
    final token = localStorageService.getAuthToken();
    if (token == null) throw Exception('User not authenticated');

    final response = await client.get(
      Uri.parse("$baseUrl/profile"),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return ProfileModel.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load profile');
    }
  }

  Future<void> updateUsername(String newUsername) async {
    final token = localStorageService.getAuthToken();
    if (token == null) throw Exception('User not authenticated');

    final response = await client.put(
      Uri.parse("$baseUrl/profile/username"),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json'
      },
      body: json.encode({'new_username': newUsername}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update username');
    }
  }

  Future<void> updatePassword({
    required String oldPassword,
    required String newPassword,
    required String confirmPassword,
  }) async {
    final token = localStorageService.getAuthToken();
    if (token == null) throw Exception('User not authenticated');

    final response = await client.put(
      Uri.parse("$baseUrl/profile/password"),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json'
      },
      body: json.encode({
        'old_password': oldPassword,
        'new_password': newPassword,
        'confirm_password': confirmPassword,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update password');
    }
  }
}
