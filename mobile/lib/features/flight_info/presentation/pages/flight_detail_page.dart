import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FlightDetailPage extends StatelessWidget {
  FlightDetailPage({super.key});

  final List<Map<String, String>> questionData = [
    {
      "englishQuestion": "What is the purpose of your visit?",
      "amharicQuestion": "የመጎብኘትዎ ዓላማ ምንድነው?",
      "englishAnswer": "I am here for tourism.",
      "amharicAnswer": "እኔ በቱሪዝም ተመክሮ መጥቻለሁ።"
    },
    {
      "englishQuestion": "How long do you plan to stay during your visit?",
      "amharicQuestion": "በመጎብኘትዎ እንድምር የትኛው ወቅት እንዳትቆዩ እቅፍ ነው?",
      "englishAnswer": "I plan to stay for two weeks.",
      "amharicAnswer": "ሁለት ሳምንት መቆየት እቅፍ ነው።"
    },
    {
      "englishQuestion": "Do you have a return ticket?",
      "amharicQuestion": "የመመለስ ቲኬት አለዎት?",
      "englishAnswer": "Yes, I have a return ticket for April 25.",
      "amharicAnswer": "አዎ, የመመለስ ቲኬት ለኤፕሪል 25 አለኝ።"
    },
    {
      "englishQuestion": "Where will you be staying during your visit?",
      "amharicQuestion": "በመጎብኘትዎ ጊዜ የት ትኖራላችሁ?",
      "englishAnswer": "I will be staying at the Hilton Hotel.",
      "amharicAnswer": "በኒዲሲን ሆቴል እኖራለሁ።"
    },
    {
      "englishQuestion": "Are you traveling alone or with others?",
      "amharicQuestion": "ብቻዎትን ነው ወይስ ከሌሎች ጋር ትጓዛላችሁ?",
      "englishAnswer": "I am traveling with my family.",
      "amharicAnswer": "ከቤተሰቤ ጋር ነው የምጓዘው።"
    }
  ];

  @override
  Widget build(BuildContext context) {
    List<Card> buildQuestionCards() {
      return questionData.map((question) {
        return Card(
          clipBehavior: Clip.antiAlias,
          color: Color(0xFF1E1E1E),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 2.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.7,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Question:", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      Row(
                        children: [
                          SizedBox(width: 20),
                          Expanded(
                            child: Text(
                              question["englishQuestion"]!,
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 4),
                      Text("ጥያቄ:", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      Row(
                        children: [
                          SizedBox(width: 20),
                          Expanded(
                            child: Text(
                              question["amharicQuestion"]!,
                              style: TextStyle(color: Colors.white70),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Container(
                      width: MediaQuery.of(context).size.width * 0.7,
                      padding: EdgeInsets.only(left: 8, top: 8, bottom: 8),
                      decoration: BoxDecoration(
                          color: Color(0xFF323232), borderRadius: BorderRadius.only(topLeft: Radius.circular(10), bottomLeft: Radius.circular(10))),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Answer:", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          Row(
                            children: [
                              SizedBox(width: 20),
                              Expanded(
                                child: Text(
                                  question["englishAnswer"]!,
                                  style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 4),
                          Text("መልስ:", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          Row(
                            children: [
                              SizedBox(width: 20),
                              Expanded(
                                child: Text(
                                  question["amharicAnswer"]!,
                                  style: TextStyle(color: Colors.white70),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        );
      }).toList();
    }

    return Scaffold(
      backgroundColor: Color(0xFF1E1E1E),
      appBar: AppBar(
          leading: IconButton(
            onPressed: () {},
            icon: Icon(Icons.arrow_back_ios_rounded),
            color: Colors.white,
          ),
          backgroundColor: Colors.transparent),
      body: Padding(
        padding: EdgeInsets.only(
          left: 16,
          right: 16,
          bottom: 16,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Text(
                "My First Trip to USA",
                style: GoogleFonts.inter(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700),
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: EdgeInsets.symmetric(vertical: 8, horizontal: 45),
                  decoration: BoxDecoration(
                    color: Color(0xFF676470),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Center(
                    child: Text(
                      "English",
                      style: GoogleFonts.inter(color: Color(0xFFF5F5F5), fontWeight: FontWeight.w400),
                    ),
                  ),
                ),
                Icon(Icons.arrow_forward_rounded, color: Colors.white),
                Container(
                  padding: EdgeInsets.symmetric(vertical: 8, horizontal: 45),
                  decoration: BoxDecoration(
                    color: Color(0xFF676470),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Center(
                    child: Text(
                      "Amharic",
                      style: GoogleFonts.inter(color: Color(0xFFF5F5F5), fontWeight: FontWeight.w400),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                shrinkWrap: true,
                children: buildQuestionCards(),
              ),
            ),
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
