import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';

class UpdateProfilePage extends StatefulWidget {
  const UpdateProfilePage({super.key});

  @override
  State<UpdateProfilePage> createState() => _UpdateProfilePageState();
}

class _UpdateProfilePageState extends State<UpdateProfilePage> {
  final TextEditingController oldPasswordController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();
  final TextEditingController newUsernameController = TextEditingController();

  Future<void> updateProfileDetails() async {
    final oldPassword = oldPasswordController.text.trim();
    final newPassword = newPasswordController.text.trim();
    final confirmPassword = confirmPasswordController.text.trim();
    final newUsername = newUsernameController.text.trim();

    bool updated = false;

    try {
      // Update username if provided
      if (newUsername.isNotEmpty) {
        final usernameRes = await http.put(
          Uri.parse(
              'https://a2sv-2025-internship-pass-me.onrender.com/profile/username'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'new_username': newUsername}),
        );
        if (usernameRes.statusCode == 200) {
          Fluttertoast.showToast(msg: "Username updated");
          updated = true;
        } else {
          Fluttertoast.showToast(msg: "Failed to update username");
        }
      }

      // If any password field is filled, validate and update
      final isPasswordChanging = oldPassword.isNotEmpty ||
          newPassword.isNotEmpty ||
          confirmPassword.isNotEmpty;

      if (isPasswordChanging) {
        if (newPassword != confirmPassword) {
          Fluttertoast.showToast(msg: "New and confirm passwords do not match");
          return;
        }

        final passwordRes = await http.put(
          Uri.parse(
              'https://a2sv-2025-internship-pass-me.onrender.com/profile/password'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'old_password': oldPassword,
            'new_password': newPassword,
            'confirm_password': confirmPassword,
          }),
        );

        if (passwordRes.statusCode == 200) {
          Fluttertoast.showToast(msg: "Password updated successfully");
          updated = true;
        } else {
          Fluttertoast.showToast(msg: "Failed to update password");
        }
      }

      if (!updated) {
        Fluttertoast.showToast(msg: "No changes detected");
      }
    } catch (e) {
      Fluttertoast.showToast(msg: "Error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF26252A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF26252A),
        title: const Text("Update Profile"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            _buildInputField("New Username", newUsernameController),
            _buildInputField("Old Password", oldPasswordController,
                isPassword: true),
            _buildInputField("New Password", newPasswordController,
                isPassword: true),
            _buildInputField("Confirm Password", confirmPasswordController,
                isPassword: true),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: updateProfileDetails,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                foregroundColor: Colors.white,
              ),
              child: const Text("Save Changes"),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInputField(String label, TextEditingController controller,
      {bool isPassword = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: TextField(
        controller: controller,
        obscureText: isPassword,
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          labelText: label,
          labelStyle: const TextStyle(color: Colors.white70),
          enabledBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white38),
          ),
          focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
