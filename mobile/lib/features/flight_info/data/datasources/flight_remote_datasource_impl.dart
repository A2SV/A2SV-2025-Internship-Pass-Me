import 'flight_remote_datasource.dart';
import '../models/flight_model.dart';

class FlightRemoteDatasourceImpl implements FlightRemoteDatasource {
  final List<FlightModel> _mockDB = [];

  @override
  Future<List<FlightModel>> fetchFlights() async => _mockDB;

  @override
  Future<void> addFlight(FlightModel flight) async => _mockDB.add(flight);

  @override
  Future<void> deleteFlight(String flightId) async =>
      _mockDB.removeWhere((f) => f.id == flightId);
}
