import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/core/service/local_storage_service.dart';

class ApiClient {
  final String baseUrl;
  final http.Client _client;
  final LocalStorageService _localStorage;
  final bool _debugMode;

  ApiClient({
    required this.baseUrl,
    required LocalStorageService localStorage,
    bool debugMode = false,
  })  : _client = http.Client(),
        _localStorage = localStorage,
        _debugMode = debugMode;

  Future<Map<String, String>> _getHeaders({bool requiresAuth = true}) async {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (requiresAuth) {
      final token = _localStorage.getAuthToken();
      if (token == null) {
        throw ApiException(
          statusCode: 401,
          message: 'No authentication token available',
        );
      }
      headers['Authorization'] = 'Bearer $token';
    }

    return headers;
  }

  Future<Map<String, dynamic>> _logRequest({
    required String method,
    required String endpoint,
    Map<String, dynamic>? body,
    Map<String, String>? queryParams,
    Map<String, String>? headers,
  }) async {
    if (!_debugMode) return {};

    print('=== API Request ===');
    print('$method $baseUrl$endpoint');
    if (queryParams != null) print('Query: $queryParams');
    if (headers != null) print('Headers: $headers');
    if (body != null) print('Body: ${jsonEncode(body)}');
    print('==================');
    return {};
  }

  Future<Map<String, dynamic>> _logResponse(http.Response response) async {
    if (!_debugMode) return {};

    print('=== API Response ===');
    print('Status: ${response.statusCode}');
    print('Headers: ${response.headers}');
    print('Body: ${response.body}');
    print('===================');
    return {};
  }

  Future<Map<String, dynamic>> post(
    String endpoint,
    Map<String, dynamic> body, {
    bool requiresAuth = true,
  }) async {
    try {
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      await _logRequest(
        method: 'POST',
        endpoint: endpoint,
        body: body,
        headers: headers,
      );

      final response = await _client.post(
        Uri.parse('$baseUrl$endpoint'),
        headers: headers,
        body: jsonEncode(body),
      );

      await _logResponse(response);
      return _handleResponse(response);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException(
        statusCode: 500,
        message: 'Network error: ${e.toString()}',
      );
    }
  }

  Future<dynamic> get(
    String endpoint, {
    Map<String, String>? queryParams,
    bool requiresAuth = true,
  }) async {
    try {
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      await _logRequest(
        method: 'GET',
        endpoint: endpoint,
        queryParams: queryParams,
        headers: headers,
      );

      final uri = Uri.parse('$baseUrl$endpoint').replace(
        queryParameters: queryParams,
      );

      final response = await _client.get(
        uri,
        headers: headers,
      );

      await _logResponse(response);
      return _handleResponse(response);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException(
        statusCode: 500,
        message: 'Network error: ${e.toString()}',
      );
    }
  }

  Future<Map<String, dynamic>> put(
    String endpoint,
    Map<String, dynamic> body, {
    bool requiresAuth = true,
  }) async {
    try {
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      await _logRequest(
        method: 'PUT',
        endpoint: endpoint,
        body: body,
        headers: headers,
      );

      final response = await _client.put(
        Uri.parse('$baseUrl$endpoint'),
        headers: headers,
        body: jsonEncode(body),
      );

      await _logResponse(response);
      return _handleResponse(response);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException(
        statusCode: 500,
        message: 'Network error: ${e.toString()}',
      );
    }
  }

  Future<Map<String, dynamic>> delete(
    String endpoint, {
    bool requiresAuth = true,
  }) async {
    try {
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      await _logRequest(
        method: 'DELETE',
        endpoint: endpoint,
        headers: headers,
      );

      final response = await _client.delete(
        Uri.parse('$baseUrl$endpoint'),
        headers: headers,
      );

      await _logResponse(response);
      return _handleResponse(response);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException(
        statusCode: 500,
        message: 'Network error: ${e.toString()}',
      );
    }
  }

  dynamic _handleResponse(http.Response response) {
    try {
      final responseBody = jsonDecode(utf8.decode(response.bodyBytes));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        // ✅ Allow either Map or List
        return responseBody;
      }

      String errorMessage = 'An error occurred';

      if (responseBody is Map<String, dynamic>) {
        errorMessage =
            responseBody['message'] ?? responseBody['error'] ?? errorMessage;
      }

      throw ApiException(
        statusCode: response.statusCode,
        message: errorMessage,
        response: responseBody,
      );
    } on FormatException {
      throw ApiException(
        statusCode: response.statusCode,
        message: 'Invalid response format',
        response: response.body,
      );
    }
  }

  void dispose() {
    _client.close();
  }
}

class ApiException implements Exception {
  final int statusCode;
  final String message;
  final dynamic response;

  ApiException({
    required this.statusCode,
    required this.message,
    this.response,
  });

  @override
  String toString() {
    final responseStr = response != null ? '\nResponse: $response' : '';
    return 'ApiException: $message (Status $statusCode)$responseStr';
  }
}
