import 'package:mobile/features/flight_info/domain/entities/flight.dart';

abstract class FlightRepository {
  Future<List<Flight>> getAllFlights();
  Future<void> addFlight(Flight flight);
  Future<void> deleteFlight(String flightId);
}
