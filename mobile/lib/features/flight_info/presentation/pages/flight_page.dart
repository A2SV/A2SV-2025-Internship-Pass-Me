import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_colors.dart';
import 'package:mobile/features/form/presentation/pages/translator_page.dart';
import 'package:mobile/features/profile/presentation/pages/profile_page.dart';
import 'package:mobile/features/flight_info/presentation/widgets/single_flight.dart'; // Import SingleFlight

class FlightPage extends StatelessWidget {
  final List<String> flights; // Replace with your actual flight model

  const FlightPage({super.key, required this.flights});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Image.asset('assets/images/logo.png', height: 40),
        backgroundColor: AppColors.backgroundColor,
        centerTitle: true,
      ),
      backgroundColor: AppColors.backgroundColor,
      body: flights.isEmpty
          ? Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Spacer(),
                const Icon(Icons.flight, size: 48, color: Colors.white),
                const SizedBox(height: 16),
                const Text(
                  "No Flight Details Yet",
                  style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 8),
                  child: Text(
                    "Start by adding your travel info — origin, destination, reason, and more — so we can help you communicate clearly at your destination",
                    style: TextStyle(color: Colors.white70),
                    textAlign: TextAlign.center,
                  ),
                ),
                const Spacer(),
                Align(
                  alignment: Alignment.bottomRight,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: FloatingActionButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => TranslatorFormPage()),
                        );
                      },
                      backgroundColor: Colors.blue,
                      child: const Icon(Icons.add),
                    ),
                  ),
                ),
              ],
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: "Find",
                            filled: true,
                            fillColor: Colors.grey[900],
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12)),
                            prefixIcon: const Icon(Icons.search, color: Colors.white),
                          ),
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.filter_alt, color: Colors.white),
                        onPressed: () {},
                      )
                    ],
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                    child: ListView.builder(
                      itemCount: flights.length,
                      itemBuilder: (context, index) {
                        return SingleFlight(
                          flightDetails: flights[index], // Pass flight details
                          onDelete: () {
                            // Handle delete action
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.pushNamed(context, '/form');
        },
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: AppColors.backgroundColor,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
            activeIcon: Icon(Icons.home, color: AppColors.primaryColor),
          ),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
        onTap: (index) {
          if (index == 1) {
            Navigator.pushNamed(context, '/profile');
          }
        },
      ),
    );
  }
}
