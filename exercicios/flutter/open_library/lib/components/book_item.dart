import 'package:flutter/material.dart';
import '../models/book_model.dart';

class BookItem extends StatelessWidget {
  final Book book;

  const BookItem({required this.book});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 6),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading:
            book.coverUrl != null
                ? ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: Image.network(
                    book.coverUrl!,
                    width: 50,
                    height: 70,
                    fit: BoxFit.cover,
                  ),
                )
                : const Icon(Icons.book, size: 50),
        title: Text(book.title, style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(book.authors.join(', ')),
      ),
    );
  }
}
