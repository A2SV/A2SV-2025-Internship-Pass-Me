import 'package:flutter/material.dart';

class FlightDetailPage extends StatelessWidget {
  const FlightDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF1E1E1E),
      appBar: AppBar(
          title: Text("My First Trip to USA"),
          backgroundColor: Colors.transparent),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(onPressed: () {}, child: Text("English")),
                Icon(Icons.swap_horiz, color: Colors.white),
                ElevatedButton(onPressed: () {}, child: Text("Amharic")),
              ],
            ),
            SizedBox(height: 20),
            for (int i = 0; i < 3; i++) ...[
              Text("Question:",
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold)),
              Text("How long do you plan to stay?",
                  style: TextStyle(color: Colors.white)),
              SizedBox(height: 4),
              Text("Answer:",
                  style: TextStyle(
                      color: Colors.blue, fontWeight: FontWeight.bold)),
              Text("I plan to stay for 15 days.",
                  style: TextStyle(color: Colors.white70)),
              SizedBox(height: 12),
            ]
          ],
        ),
      ),
      bottomNavigationBar: Container(
        color: Color(0xFF1E1E1E),
        padding: EdgeInsets.all(12),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: Colors.blue),
          onPressed: () {},
          child: Text("Use Chat"),
        ),
      ),
    );
  }
}
