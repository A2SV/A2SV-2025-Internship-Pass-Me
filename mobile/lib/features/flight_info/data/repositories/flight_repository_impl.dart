import '../../domain/entities/flight.dart';
import '../../domain/repositories/flight_repository.dart';
import '../datasources/flight_remote_datasource.dart';
import '../models/flight_model.dart';

class FlightRepositoryImpl implements FlightRepository {
  final FlightRemoteDatasource remoteDatasource;

  FlightRepositoryImpl({required this.remoteDatasource});

  @override
  Future<List<Flight>> getAllFlights() async =>
      await remoteDatasource.fetchFlights();

  @override
  Future<void> addFlight(Flight flight) async =>
      await remoteDatasource.addFlight(flight as FlightModel);

  @override
  Future<void> deleteFlight(String flightId) async =>
      await remoteDatasource.deleteFlight(flightId);
}
