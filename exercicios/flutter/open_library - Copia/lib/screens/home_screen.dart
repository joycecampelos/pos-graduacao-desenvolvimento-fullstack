import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/book_provider.dart';
import '../components/book_item.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();

  void _search() {
    final query = _controller.text.trim();
    if (query.isNotEmpty) {
      Provider.of<BookProvider>(context, listen: false).searchBooks(query);
    }
  }

  void _clear() {
    _controller.clear();
    Provider.of<BookProvider>(context, listen: false).clearSearch();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<BookProvider>(context);

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Open Library Search'),
          backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        ),
        body: Padding(
          padding: const EdgeInsets.fromLTRB(15.0, 30.0, 15.0, 15.0),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        labelText: 'Search for books',
                        hintText: 'Enter title, author or keywords',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                        suffixIcon:
                            _controller.text.isNotEmpty
                                ? IconButton(
                                  icon: Icon(Icons.clear),
                                  onPressed: _clear,
                                )
                                : null,
                      ),
                      onSubmitted: (_) => _search(),
                      onChanged: (_) {
                        setState(() {});
                      },
                    ),
                  ),
                  SizedBox(width: 10),
                  Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primary,
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: Icon(Icons.search, color: Colors.white),
                      onPressed: _search,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 20),
              if (provider.isLoading)
                Center(child: CircularProgressIndicator())
              else if (provider.error.isNotEmpty)
                Text(provider.error)
              else if (provider.books.isEmpty)
                if (provider.hasSearched)
                  Text('No results found for "${_controller.text}"')
                else
                  Text('Enter a query and press search.')
              else
                Expanded(
                  child: ListView.builder(
                    itemCount: provider.books.length,
                    itemBuilder: (ctx, i) => BookItem(book: provider.books[i]),
                  ),
                ),
              if (provider.books.isNotEmpty)
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton.icon(
                      onPressed:
                          provider.currentPage > 1 && !provider.isLoading
                              ? provider.previousPage
                              : null,
                      icon: Icon(Icons.arrow_back),
                      label: Text('Anterior'),
                    ),
                    Text('Página ${provider.currentPage}'),
                    ElevatedButton.icon(
                      onPressed: !provider.isLoading ? provider.nextPage : null,
                      icon: Icon(Icons.arrow_forward),
                      label: Text('Próximo'),
                    ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }
}
