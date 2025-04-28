import 'dart:convert';

import '../../../../core/errors/exceptions.dart';
import '../../../../core/network/api_client.dart';
import 'flight_remote_datasource.dart';
import '../models/flight_model.dart';

class FlightRemoteDatasourceImpl implements FlightRemoteDatasource {
  final ApiClient _apiClient;

  FlightRemoteDatasourceImpl(this._apiClient);

  @override
  Future<List<FlightModel>> fetchFlights() async {
    final response = await _apiClient.get("/flights", requiresAuth: true);
    print(response);

    // Check if response is null or not a list
    if (response == null || response is! List) {
      print('No flights found or response is not a list.');
      return [];
    }

    final flights = response
        .map((json) {
          try {
            return FlightModel.fromJson(json as Map<String, dynamic>);
          } catch (e) {
            print('Error parsing flight: $e');
            return null;
          }
        })
        .where((flight) => flight != null)
        .cast<FlightModel>()
        .toList();

    print('Successfully parsed ${flights.length} flights');
    return flights;
  }

  @override
  Future<void> deleteFlight(String flightId) async {
    try {
      final response = await _apiClient.delete(
        '/flights/$flightId',
        requiresAuth: true,
      );
      return response['message'];
    } catch (e) {
      throw ServerException('Failed to delete flight: ${e.toString()}');
    }
  }
}
