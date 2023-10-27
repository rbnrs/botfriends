import 'dart:convert';

import 'package:CodingChallengeFE/entities/Developer.dart';
import 'package:http/http.dart' as http;

class DevelopersDAO {
  String baseUrl = "http://localhost:3000/";
  String endpointDevelopers = "DeveloperSet";

  ///
  /// executes http request to get entries from baackend
  ///
  Future<List<Developer>> getSampleItemsFromBackend() async {
    Uri url = Uri.parse(baseUrl + endpointDevelopers);
    http.Response response = await http.get(
      url,
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE, HEAD"
      },
    );

    if (response.statusCode == 200) {
      return _getDeveloperListFromResponse(response);
    }

    return [];
  }

  ///
  /// convert json response into list with samples
  ///
  List<Developer> _getDeveloperListFromResponse(http.Response response) {
    List responseList = jsonDecode(response.body)
        .map((value) => Developer.fromJson(value))
        .toList();

    List<Developer> sampleList = [];
    for (var sample in responseList) {
      sampleList.add(sample);
    }
    return sampleList;
  }
}
