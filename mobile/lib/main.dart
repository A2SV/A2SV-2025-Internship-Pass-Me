import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/features/auth/presentation/blocs/sign_up_bloc.dart';
import 'package:mobile/features/auth/presentation/pages/signup_pages.dart';
import 'package:mobile/features/form/presentation/blocs/form_bloc.dart';
import 'package:mobile/features/form/presentation/pages/translator_page.dart';
import 'package:mobile/features/onboarding/presentation/bloc/onboarding_bloc.dart';

import 'features/auth/presentation/blocs/login_cubit.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/flight_info/presentation/pages/flight_empty_page.dart';
import 'features/flight_info/presentation/pages/flight_list_page.dart';
import 'features/flight_info/presentation/pages/flight_detail_page.dart';

import 'features/onboarding/presentation/pages/onboarding_page.dart';

import 'injection_container.dart' as di;

void main() {
  di.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<LoginCubit>(
          create: (_) => di.sl<LoginCubit>(),
        ),
        BlocProvider<SignUpBloc>(
          create: (_) => di.sl<SignUpBloc>(),
        ),
        BlocProvider<OnboardingBloc>(
          create: (_) => di.sl<OnboardingBloc>(), // Add OnboardingBloc here
        ),
        BlocProvider<FormBloc>(
          create: (_) => di.sl<FormBloc>(),
        )
      ],
      child: MaterialApp(
        title: 'PassMe',
        debugShowCheckedModeBanner: false,
        theme: ThemeData.dark().copyWith(
          textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
          primaryTextTheme:
              GoogleFonts.interTextTheme(ThemeData.dark().primaryTextTheme),
          colorScheme: const ColorScheme.dark(
            primary: Color(0xFF2196F3),
          ),
        ),
        initialRoute: '/onboarding',
        routes: {
          '/onboarding': (_) => const OnboardingPage(),
          '/login': (_) => LoginPage(),
          '/signup': (_) => SignUpPage(),
          '/flights/empty': (_) => const FlightEmptyPage(),
          '/flights/list': (_) => const FlightListPage(),
          '/flights/detail': (_) => FlightDetailPage(),
          '/form': (_) => TranslatorFormPage(),
        },
      ),
    );
  }
}
