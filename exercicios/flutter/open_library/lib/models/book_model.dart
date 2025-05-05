class Book {
  final String title;
  final List<String> authors;
  final int? coverId;

  Book({required this.title, required this.authors, this.coverId});

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      title: json['title'] ?? 'Sem título',
      authors: List<String>.from(json['author_name'] ?? []),
      coverId: json['cover_i'],
    );
  }

  String? get coverUrl =>
      coverId != null
          ? 'https://covers.openlibrary.org/b/id/$coverId-M.jpg'
          : null;
}
