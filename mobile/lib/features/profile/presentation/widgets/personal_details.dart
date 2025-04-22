import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PersonalDetails extends StatelessWidget {
  final String imageUrl;
  final String name;
  final String email;

  const PersonalDetails({super.key, required this.imageUrl, required this.name, required this.email});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Center(
          child: CircleAvatar(
            radius: 35,
            backgroundImage: AssetImage(imageUrl),
          ),
        ),
        const SizedBox(width: 20),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(name, style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.w400, color: Colors.white)),
            Text(email, style: GoogleFonts.roboto(fontSize: 18, fontWeight: FontWeight.w400, color: Color(0xFF6B7280)))
          ],
        ),
        const Spacer(),
        IconButton(
          icon: const Icon(Icons.edit_outlined, color: Colors.white),
          onPressed: () {
            // Handle edit action here
          },
        ),
      ],
    );
  }
}
