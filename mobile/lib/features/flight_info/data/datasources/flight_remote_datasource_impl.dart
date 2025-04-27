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

    // Check if response is null or empty
    if (response == null || response.isEmpty) {
      print('No flights found.');
      return [];
    }

    final flights = response
        .map((json) {
          try {
            return FlightModel.fromJson(json);
          } catch (e) {
            print('Error parsing flight: $e');
            return null;
          }
        })
        .whereType<FlightModel>()
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