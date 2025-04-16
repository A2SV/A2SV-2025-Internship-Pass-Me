import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_colors.dart';

class FlightListPage extends StatelessWidget {
  const FlightListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: Padding(
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
                      prefixIcon: Icon(Icons.search, color: Colors.white),
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.filter_alt, color: Colors.white),
                  onPressed: () {},
                )
              ],
            ),
            SizedBox(height: 16),
            // TODO: ListView.builder for actual flights
            ListTile(
              leading: Icon(Icons.message, color: Colors.white),
              title: Text("My First Trip to USA",
                  style: TextStyle(color: Colors.white)),
              subtitle: Text("Ethiopia - USA\nMar 28, 2025",
                  style: TextStyle(color: Colors.white70)),
              trailing: IconButton(
                icon: Icon(Icons.delete, color: Colors.redAccent),
                onPressed: () {},
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {},
        child: Icon(Icons.add),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}
