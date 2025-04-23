import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/core/theme/app_colors.dart';

class TranslatorPage extends StatelessWidget {
  const TranslatorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF26252A),
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_rounded),
          color: Colors.white,
        ),
        backgroundColor: Colors.transparent,
        title: Align(
          alignment: Alignment.center,
          child: Image.asset(
            'assets/images/logo.png',
            height: 42,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Text(
                "My First Trip to USA",
                style: GoogleFonts.inter(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildLanguageChip("Amharic"),
                const Icon(Icons.arrow_forward_rounded, color: Colors.white),
                _buildLanguageChip("English"),
              ],
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: 4, // Replace with actual data length
                itemBuilder: (context, index) {
                  return _buildQuestionAnswerCard({
                    "englishQuestion": "What is the purpose of your visit?",
                    "amharicQuestion": "የመጎብኘትዎ ዓላማ ምንድነው?",
                    "englishAnswer": "I am here for tourism.",
                    "amharicAnswer": "እኔ በቱሪዝም ተመክሮ መጥቻለሁ።",
                  });
                },
              ),
            ),
            Center(
              child: Container(
                width: 64,
                height: 64,
                margin: const EdgeInsets.only(bottom: 32),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.blue,
                ),
                child: const Icon(
                  Icons.mic,
                  color: Colors.white,
                  size: 32,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLanguageChip(String language) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 45),
      decoration: BoxDecoration(
        color: const Color(0xFF676470),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Center(
        child: Text(
          language,
          style: GoogleFonts.inter(
            color: const Color(0xFFF5F5F5),
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
    );
  }

  Widget _buildQuestionAnswerCard(Map<String, String> qa) {
    return Card(
      elevation: 0.0,
      clipBehavior: Clip.antiAlias,
      color: const Color(0xFF26252A),
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Question:",
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              qa["englishQuestion"]!,
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              "ጥያቄ:",
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              qa["amharicQuestion"]!,
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              "Answer:",
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              qa["englishAnswer"]!,
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              "መልስ:",
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              qa["amharicAnswer"]!,
              style: GoogleFonts.inter(
                color: Colors.white,
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}