import 'package:flutter/material.dart';

class SingleFlight extends StatelessWidget {
  final String flightDetails; // Replace with your actual flight model
  final VoidCallback onDelete;

  const SingleFlight({
    super.key,
    required this.flightDetails,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const Icon(Icons.flight, color: Colors.white),
      title: Text(
        flightDetails, // Replace with flight details
        style: const TextStyle(color: Colors.white),
      ),
      subtitle: const Text(
        "Ethiopia - USA\nMar 28, 2025", // Replace with actual data
        style: TextStyle(color: Colors.white70),
      ),
      trailing: IconButton(
        icon: const Icon(Icons.delete, color: Colors.redAccent),
        onPressed: onDelete, // Handle delete action
      ),
    );
  }
}