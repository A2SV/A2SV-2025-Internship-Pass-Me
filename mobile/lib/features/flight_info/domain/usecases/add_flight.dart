import '../entities/flight.dart';
import '../repositories/flight_repository.dart';

class AddFlight {
  final FlightRepository repository;
  AddFlight(this.repository);

  Future<void> call(Flight flight) => repository.addFlight(flight);
}
