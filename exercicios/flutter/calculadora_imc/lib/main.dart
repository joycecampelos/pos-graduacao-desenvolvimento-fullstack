import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Calculadora IMC',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          primary: Colors.grey[850],
        ),
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
      home: CalculadoraIMC(),
    );
  }
}

class CalculadoraIMC extends StatefulWidget {
  const CalculadoraIMC({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _CalculadoraIMCState createState() => _CalculadoraIMCState();
}

class _CalculadoraIMCState extends State<CalculadoraIMC> {
  final TextEditingController _pesoController = TextEditingController();
  final TextEditingController _alturaController = TextEditingController();

  double _imc = 0;
  String _classificacao = '';

  void _calcularIMC() {
    String pesoText = _pesoController.text.replaceAll(',', '.');
    String alturaText = _alturaController.text.replaceAll(',', '.');

    double peso = double.tryParse(pesoText) ?? 0.0;
    double altura = double.tryParse(alturaText) ?? 0.0;

    if (peso > 0 && altura > 0) {
      setState(() {
        _imc = peso / (altura * altura);
        _classificacao = _classificaIMC(_imc);
      });
    }
  }

  String _classificaIMC(double imc) {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc < 24.9) {
      return 'Peso ideal';
    } else if (imc < 29.9) {
      return 'Sobrepeso';
    } else if (imc < 34.9) {
      return 'Obesidade Grau I';
    } else if (imc < 39.9) {
      return 'Obesidade Grau II';
    } else {
      return 'Obesidade Grau III';
    }
  }

  void _limparCampos() {
    setState(() {
      _pesoController.clear();
      _alturaController.clear();
      _imc = 0;
      _classificacao = '';
    });
  }

  Color _corClassificacao() {
    if (_imc < 18.5) {
      return Colors.blue;
    } else if (_imc < 24.9) {
      return Colors.green;
    } else if (_imc < 29.9) {
      return Colors.orange;
    } else {
      return Colors.red;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Calculadora de IMC')),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _pesoController,
              decoration: InputDecoration(
                labelText: 'Peso (kg)',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16),
            TextField(
              controller: _alturaController,
              decoration: InputDecoration(
                labelText: 'Altura (m)',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: _calcularIMC,
                  child: Text('Calcular IMC'),
                ),
                SizedBox(height: 5),
                ElevatedButton(
                  onPressed: _limparCampos,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[350],
                  ),
                  child: Text('Limpar'),
                ),
              ],
            ),
            SizedBox(height: 35),
            if (_imc > 0)
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: _corClassificacao().withOpacity(0.7),
                  border: Border.all(
                    color: _corClassificacao(),
                    width: 2,
                  ),
                  borderRadius: BorderRadius.circular(25),
                  boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 5)],
                ),
                child: Column(
                  children: [
                    Text(
                      'IMC: ${_imc.toStringAsFixed(1).replaceAll('.', ',')}',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 5),
                    Text(
                      _classificacao,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
