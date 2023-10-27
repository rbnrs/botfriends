// ignore: file_names
import 'package:CodingChallengeFE/entities/Developer.dart';
import 'package:CodingChallengeFE/services/DevelopersDAO.dart';
import 'package:CodingChallengeFE/utils/CustomColors.dart';
import 'package:flutter/material.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  late Future<List<Developer>> futureSample;

  List<Developer> developers = [];

  @override
  void initState() {
    super.initState();
    futureSample = DevelopersDAO().getSampleItemsFromBackend();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: CustomColors.backgroundcolor,
        appBar: AppBar(
          title: const Text(
            'BOTFRIENDS Coding Challenge',
            style: TextStyle(
              letterSpacing: 4.0,
              fontWeight: FontWeight.w300,
            ),
          ),
          backgroundColor: CustomColors.primaryColor,
          shadowColor: Colors.transparent,
        ),
        body: Container(
          margin: const EdgeInsets.all(20),
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: FutureBuilder<List<Developer>>(
            future: futureSample,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                developers = snapshot.data as List<Developer>;
                return GridView.builder(
                  itemBuilder: listviewBuilder,
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                      mainAxisExtent: 200, maxCrossAxisExtent: 450),
                  itemCount: developers.length,
                );
              } else {
                // ignore: avoid_print
                print("${snapshot.error}");
                return Text("${snapshot.error}");
              }
            },
          ),
        ));
  }

  ///
  /// factory function for list view
  ///
  Widget listviewBuilder(BuildContext context, int index) {
    Developer developer = developers[index];

    return Container(
        margin: const EdgeInsets.all(5),
        child: Card(
          child: InkWell(
            onTap: () => {},
            child: Container(
                margin: const EdgeInsets.all(15),
                child: Column(
                  children: [
                    ClipRRect(
                        borderRadius: BorderRadius.circular(200),
                        child: developer.imageUrl != ""
                            ? Image.network(
                                developer.imageUrl,
                                height: 70,
                                fit: BoxFit.fitHeight,
                              )
                            : ClipRRect(
                                borderRadius: BorderRadius.circular(200),
                                child: Container(
                                  height: 70,
                                  width: 70,
                                  color: const Color.fromRGBO(242, 248, 251, 1),
                                  child: const Icon(
                                    Icons.person,
                                    size: 45,
                                  ),
                                ),
                              )),
                    const SizedBox(
                      height: 15,
                    ),
                    Text(
                      '${developer.firstName} ${developer.lastName}',
                      style: const TextStyle(
                        color: CustomColors.fontcolor,
                        fontSize: 18,
                        letterSpacing: 2.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(
                      developer.jobDescription,
                      style: const TextStyle(
                        color: CustomColors.fontcolor,
                        fontSize: 12,
                        letterSpacing: 2.0,
                        fontWeight: FontWeight.w600,
                      ),
                    )
                  ],
                )),
          ),
        ));
  }
}
