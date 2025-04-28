import 'package:flutter/material.dart';
import 'package:mobile/core/theme/app_colors.dart';

enum Language { english, amharic, turkish }

extension LanguageExtension on Language {
  String get code {
    switch (this) {
      case Language.english:
        return 'english';
      case Language.amharic:
        return 'amharic';
      case Language.turkish:
        return 'turkish';
    }
  }
}

class LanguageSelector extends StatelessWidget {
  final Language selectedLanguage;
  final ValueChanged<Language> onChanged;

  const LanguageSelector({
    super.key,
    required this.selectedLanguage,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.borderColor),
        borderRadius: BorderRadius.circular(8),
        color: AppColors.cardColor,
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<Language>(
          value: selectedLanguage,
          isExpanded: true,
          dropdownColor: AppColors.cardColor,
          style: const TextStyle(color: AppColors.textColor, fontSize: 14),
          icon: const Icon(Icons.arrow_drop_down, color: AppColors.textColor),
          items: Language.values.map((Language language) {
            return DropdownMenuItem<Language>(
              value: language,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Text(
                  language.toString().split('.').last,
                  style: const TextStyle(color: AppColors.textColor),
                ),
              ),
            );
          }).toList(),
          onChanged: (Language? newValue) {
            if (newValue != null) {
              onChanged(newValue);
            }
          },
        ),
      ),
    );
  }
}
