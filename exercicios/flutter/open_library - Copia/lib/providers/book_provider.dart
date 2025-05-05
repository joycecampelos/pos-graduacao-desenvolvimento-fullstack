import 'package:flutter/material.dart';
import '../models/book_model.dart';
import '../services/book_service.dart';

class BookProvider with ChangeNotifier {
  List<Book> _books = [];
  bool _isLoading = false;
  bool _hasSearched = false;
  String _error = '';
  String _lastQuery = '';
  int _currentPage = 1;

  List<Book> get books => _books;
  bool get isLoading => _isLoading;
  bool get hasSearched => _hasSearched;
  String get error => _error;
  int get currentPage => _currentPage;

  Future<void> searchBooks(String query, {int page = 1}) async {
    _isLoading = true;
    _hasSearched = true;
    _error = '';
    _lastQuery = query;
    _currentPage = page;
    notifyListeners();

    try {
      _books = await BookService.fetchBooks(query, limit: 10, page: page);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void nextPage() {
    searchBooks(_lastQuery, page: _currentPage + 1);
  }

  void previousPage() {
    if (_currentPage > 1) {
      searchBooks(_lastQuery, page: _currentPage - 1);
    }
  }

  void clearSearch() {
    _books = [];
    _error = '';
    _lastQuery = '';
    _currentPage = 1;
    _hasSearched = false;
    notifyListeners();
  }
}
