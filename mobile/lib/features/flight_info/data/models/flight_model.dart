import '../../domain/entities/flight.dart';

class FlightModel extends Flight {
  FlightModel({
    required String id,
    required String title,
    required String origin,
    required String destination,
    required String reason,
    required DateTime date,
  }) : super(
          id: id,
          title: title,
          origin: origin,
          destination: destination,
          reason: reason,
          date: date,
        );
  factory FlightModel.fromJson(Map<String, dynamic> json) {
    return FlightModel(
      id: json['id'],
      title: json['title'],
      origin: json['origin'],
      destination: json['destination'],
      reason: json['reason'],
      date: DateTime.parse(json['date']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'origin': origin,
      'destination': destination,
      'reason': reason,
      'date': date.toIso8601String(),
    };
  }
}
