import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/features/profile/presentation/widgets/personal_details.dart';
import 'package:mobile/features/profile/presentation/widgets/profile_option.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF26252A),
      appBar: AppBar(
        backgroundColor: Color(0xFF26252A),
        title: SizedBox(
          height: 36,
          child: Image.asset("assets/images/logo.png"),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: ListView(
          children: [
            PersonalDetails(
              imageUrl: 'assets/images/profile_picture(hat).jpg',
              name: "John Doe",
              email: "john.doe@gmail.com",
            ),
            const SizedBox(height: 8),
            Divider(
              color: Colors.white,
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "Change Password",
              onTap: () {},
              leadingIcon: Icon(Icons.lock_outline_rounded, size: 30),
              // trailingIcon: Icon(Icons.edit_outlined),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "Language Preference",
              onTap: () {},
              leadingIcon: Icon(Icons.language_outlined, size: 30),
              trailingIcon: Text(
                "English",
                style: GoogleFonts.poppins(
                  color: Color(0xFFB7B7B7),
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "Clear History",
              onTap: () {},
              leadingIcon: Icon(Icons.history_rounded, size: 30),
              // trailingIcon: ElevatedButton(
              //   onPressed: () {},
              //   style: ElevatedButton.styleFrom(
              //     backgroundColor: Color(0xFFFF2A3C),
              //     shape: RoundedRectangleBorder(
              //       borderRadius: BorderRadius.circular(4.0),
              //     ),
              //     padding: EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
              //   ),
              //   child: Text(
              //     "Clear All",
              //     style: GoogleFonts.poppins(
              //       color: Colors.white,
              //       fontSize: 14,
              //       fontWeight: FontWeight.w500,
              //     ),
              //   ),
              // ),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "About",
              onTap: () {},
              leadingIcon: Icon(Icons.info_outline_rounded, size: 30),
            ),
            const SizedBox(height: 20),
            ProfileOption(
                title: "Log Out",
                titleStyle: GoogleFonts.poppins(
                  color: Color(0xFFF63C3C),
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                ),
                onTap: () {},
                leadingIcon: Icon(
                  Icons.logout_outlined,
                  size: 30,
                  color: Color(0xFFF63C3C),
                )),
          ],
        ),
      ),
    );
  }
}
