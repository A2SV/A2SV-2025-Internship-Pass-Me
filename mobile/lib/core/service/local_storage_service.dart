import 'package:shared_preferences/shared_preferences.dart';

class LocalStorageService {
  static const String _authTokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'user_id';
  static const String _userEmailKey = 'user_email';
  static const String _rememberMeKey = 'remember_me';
  static const String _usernameKey = 'username'; // Add a key for the username

  final SharedPreferences _prefs;

  LocalStorageService(this._prefs);

  // Auth Token Methods
  Future<void> saveAuthToken(String token) async {
    await _prefs.setString(_authTokenKey, token);
  }

  String? getAuthToken() {
    return _prefs.getString(_authTokenKey);
  }

  Future<void> clearAuthToken() async {
    await _prefs.remove(_authTokenKey);
  }

  // Username Methods
  Future<void> saveUsername(String username) async {
    await _prefs.setString(_usernameKey, username); // Save the username
  }

  String? getUsername() {
    return _prefs.getString(_usernameKey); // Retrieve the username
  }

  Future<void> clearUsername() async {
    await _prefs.remove(_usernameKey); // Clear the username
  }

  // Refresh Token Methods
  Future<void> saveRefreshToken(String token) async {
    await _prefs.setString(_refreshTokenKey, token);
  }

  String? getRefreshToken() {
    return _prefs.getString(_refreshTokenKey);
  }

  Future<void> clearRefreshToken() async {
    await _prefs.remove(_refreshTokenKey);
  }

  // User ID Methods
  Future<void> saveUserId(String userId) async {
    await _prefs.setString(_userIdKey, userId);
  }

  String? getUserId() {
    return _prefs.getString(_userIdKey);
  }

  Future<void> clearUserId() async {
    await _prefs.remove(_userIdKey);
  }

  // User Email Methods
  Future<void> saveUserEmail(String email) async {
    await _prefs.setString(_userEmailKey, email);
  }

  String? getUserEmail() {
    return _prefs.getString(_userEmailKey);
  }

  Future<void> clearUserEmail() async {
    await _prefs.remove(_userEmailKey);
  }

  // Remember Me Methods
  Future<void> saveRememberMe(bool rememberMe) async {
    await _prefs.setBool(_rememberMeKey, rememberMe);
  }

  bool getRememberMe() {
    return _prefs.getBool(_rememberMeKey) ?? false;
  }

  // Clear all user data (for logout)
  Future<void> clearAllUserData() async {
    await Future.wait([
      clearAuthToken(),
      clearRefreshToken(),
      clearUserId(),
      clearUserEmail(),
      clearUsername(), // Clear the username as well
    ]);
  }

  // Helper to check if user is authenticated
  bool isAuthenticated() {
    return getAuthToken() != null;
  }

  Future<void> saveUserData(String token, String username, String email) async {
    // Save token, username, email
  }
}
