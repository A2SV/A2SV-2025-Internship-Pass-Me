import 'package:flutter/material.dart';
import 'package:mobile/features/form/domain/entites/question.dart';
import 'package:mobile/core/theme/app_colors.dart';

class QuestionCard extends StatefulWidget {
  final QuestionEntity question;
  final bool isSelected;
  final VoidCallback onTap;
  final ValueChanged<String> onChanged;
  final TextEditingController controller;

  const QuestionCard({
    super.key,
    required this.question,
    required this.isSelected,
    required this.onTap,
    required this.onChanged,
    required this.controller,
  });

  @override
  State<QuestionCard> createState() => _QuestionCardState();
}

class _QuestionCardState extends State<QuestionCard> {
  late FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _focusNode = FocusNode();
    // Initialize controller text if empty
    if (widget.controller.text.isEmpty && widget.question.answer != null) {
      widget.controller.text = widget.question.answer!;
    }
  }

  @override
  void didUpdateWidget(QuestionCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Update controller if question changed from outside
    if (oldWidget.question.answer != widget.question.answer &&
        widget.controller.text != widget.question.answer) {
      widget.controller.text = widget.question.answer ?? '';
    }
  }

  @override
  void dispose() {
    _focusNode.dispose();
    // Note: We don't dispose the controller here since it's managed by the parent
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        widget.onTap();
        _focusNode.requestFocus();
      },
      child: SizedBox(
        width: double.infinity,
        child: Card(
          color: AppColors.backgroundColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          margin: const EdgeInsets.symmetric(vertical: 0, horizontal: 0),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 6.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 1.0),
                  child: Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: '${widget.question.id}. ',
                          style: const TextStyle(
                            color: AppColors.textColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        TextSpan(
                          text: widget.question.questionText,
                          style: const TextStyle(
                            color: AppColors.textColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.borderColor),
                    borderRadius: BorderRadius.circular(8),
                    color: AppColors.cardColor,
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: TextField(
                    controller: widget.controller,
                    focusNode: _focusNode,
                    onChanged: widget.onChanged,
                    style: const TextStyle(color: AppColors.textColor, fontSize: 14),
                    decoration: InputDecoration(
                      hintText: widget.question.placeholder,
                      hintStyle: TextStyle(color: AppColors.hintTextColor, fontSize: 14),
                      border: InputBorder.none,
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 0,
                        vertical: 16,
                      ),
                    ),
                    maxLines: null,
                    textInputAction: TextInputAction.next,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
