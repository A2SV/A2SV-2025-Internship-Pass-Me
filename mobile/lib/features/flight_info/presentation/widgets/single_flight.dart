import 'package:flutter/material.dart';
import '../../domain/entities/flight.dart';

class SingleFlight extends StatelessWidget {
  final Flight flight;
  final VoidCallback onDelete;
  final bool isDeleting;

  const SingleFlight({
    super.key,
    required this.flight,
    required this.onDelete,
    this.isDeleting = false,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 6),
      color: Colors.grey[900],
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Stack(
        children: [
          InkWell(
            onTap: isDeleting
                ? null
                : () {
                    Navigator.pushNamed(
                      context,
                      '/flight_details',
                      arguments: flight,
                    );
                  },
            child: Padding(
              padding: const EdgeInsets.all(6.0),
              child: Row(
                children: [
                  Expanded(
                    flex: 10, // 35% for the icon
                    child: Center(
                      child: Icon(Icons.message,
                          color: Colors.white, size: 42), // slightly bigger
                    ),
                  ),
                  Expanded(
                    flex: 90, // 65% for the text
                    child: Padding(
                      padding: const EdgeInsets.all(6.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Text(
                                  flight.title,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              if (!isDeleting)
                                IconButton(
                                  icon: const Icon(
                                    Icons.delete_outline,
                                    color: Colors.redAccent,
                                    size: 30,
                                  ),
                                  onPressed: onDelete,
                                ),
                            ],
                          ),
                          Row(
                            children: [
                              const Icon(Icons.flight_takeoff,
                                  color: Colors.white70, size: 16),
                              const SizedBox(width: 4),
                              Text(flight.fromCountry,
                                  style:
                                      const TextStyle(color: Colors.white70)),
                              const SizedBox(width: 8),
                              const Icon(Icons.arrow_forward,
                                  color: Colors.white70, size: 16),
                              const SizedBox(width: 8),
                              const Icon(Icons.flight_land,
                                  color: Colors.white70, size: 16),
                              const SizedBox(width: 4),
                              Text(flight.toCountry,
                                  style: const TextStyle(
                                      color: Colors.white70, fontSize: 12)),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              const Icon(Icons.calendar_today,
                                  color: Colors.white70, size: 16),
                              const SizedBox(width: 4),
                              Text(
                                "${flight.date.day}/${flight.date.month}/${flight.date.year}",
                                style: const TextStyle(color: Colors.white70),
                              ),
                              const SizedBox(width: 16),
                              const Icon(Icons.work_outline,
                                  color: Colors.white70, size: 16),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (isDeleting)
            Positioned.fill(
              child: Container(
                color: Colors.black54,
                child: const Center(
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
