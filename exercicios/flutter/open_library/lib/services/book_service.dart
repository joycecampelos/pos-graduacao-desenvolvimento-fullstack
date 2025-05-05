import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/book_model.dart';

class BookService {
  static Future<List<Book>> fetchBooks(
    String query, {
    int limit = 10,
    int page = 1,
  }) async {
    final url = Uri.parse(
      'https://openlibrary.org/search.json?q=$query&limit=$limit&page=$page',
    );

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final books =
            (data['docs'] as List).map((item) => Book.fromJson(item)).toList();
        return books;
      } else {
        throw Exception('Erro na requisição');
      }
    } catch (e) {
      throw Exception('Erro ao buscar livros: $e');
    }
  }
}
