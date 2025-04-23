import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/features/profile/presentation/pages/update_profile_page.dart';
import 'package:mobile/features/profile/presentation/widgets/personal_details.dart';
import 'package:mobile/features/profile/presentation/widgets/profile_option.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF26252A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF26252A),
        title: SizedBox(
          height: 36,
          child: Image.asset("assets/images/logo.png"),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            PersonalDetails(
              imageUrl: 'assets/images/profile_picture(puppy).jpg',
              name: "John Doe",
              email: "john.doe@gmail.com",
            ),
            const SizedBox(height: 8),
            const Divider(color: Colors.white),
            const SizedBox(height: 20),
            // ProfileOption(
            //   title: "Change Password",
            //   onTap: () {
            //     Navigator.push(
            //       context,
            //       MaterialPageRoute(
            //         builder: (_) => const UpdateProfilePage(),
            //       ),
            //     );
            //   },
            //   leadingIcon: const Icon(Icons.lock_outline_rounded, size: 30),
            //   trailingIcon: const Icon(Icons.edit_outlined),
            // ),
            // const SizedBox(height: 20),
            ProfileOption(
              title: "Language Preference",
              onTap: () {},
              leadingIcon: const Icon(Icons.language_outlined, size: 30),
              trailingIcon: Text(
                "English",
                style: GoogleFonts.poppins(
                  color: const Color(0xFFB7B7B7),
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "Clear History",
              onTap: () {},
              leadingIcon: const Icon(Icons.history_rounded, size: 30),
              trailingIcon: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF2A3C),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12.0,
                    vertical: 8.0,
                  ),
                ),
                child: Text(
                  "Clear All",
                  style: GoogleFonts.poppins(
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "About",
              onTap: () {},
              leadingIcon: const Icon(Icons.info_outline_rounded, size: 30),
            ),
            const SizedBox(height: 20),
            ProfileOption(
              title: "Log Out",
              titleStyle: GoogleFonts.poppins(
                color: const Color(0xFFF63C3C),
                fontSize: 16,
                fontWeight: FontWeight.w400,
              ),
              onTap: () {},
              leadingIcon: const Icon(
                Icons.logout_outlined,
                size: 30,
                color: Color(0xFFF63C3C),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
