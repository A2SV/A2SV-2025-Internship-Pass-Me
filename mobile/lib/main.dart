import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'features/auth/presentation/blocs/login_cubit.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/flight_info/presentation/pages/flight_empty_page.dart';
import 'features/flight_info/presentation/pages/flight_list_page.dart';
import 'features/flight_info/presentation/pages/flight_detail_page.dart';

import 'injection_container.dart' as di;

void main() {
  di.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<LoginCubit>(
          create: (_) => di.sl<LoginCubit>(),
        ),
        // Add other cubits or blocs here if needed
      ],
      child: MaterialApp(
        title: 'PassMe',
        debugShowCheckedModeBanner: false,
        theme: ThemeData.dark(),
        initialRoute: '/',
        routes: {
          '/': (_) => LoginPage(),
          '/flights/empty': (_) => const FlightEmptyPage(),
          '/flights/list': (_) => const FlightListPage(),
          '/flights/detail': (_) => FlightDetailPage(),
        },
      ),
    );
  }
}
