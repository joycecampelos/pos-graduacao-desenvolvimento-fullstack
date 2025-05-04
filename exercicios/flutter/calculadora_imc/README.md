# Calculadora de IMC

Um aplicativo simples desenvolvido em **Flutter** para calcular o **Índice de Massa Corporal (IMC)** com base no peso e altura informados pelo usuário.


## Funcionalidades

- Entrada de **peso (kg)** e **altura (m)** via campos de texto.
- Cálculo automático do IMC ao clicar no botão **"Calcular IMC"**.
- Classificação do IMC conforme a tabela da OMS:
  - Abaixo do peso
  - Peso ideal
  - Sobrepeso
  - Obesidade Grau I, II ou III
- Exibição do resultado com **cores diferentes** para cada faixa.
- Botão **"Limpar"** para resetar os campos e o resultado.
- Tratamento de entrada com vírgula (ex: `1,75` será convertido corretamente).


## Tecnologias

- Flutter (Material Design 3)
- Dart


## Como Executar

1. Clone este repositório.
2. Instale as dependências:
  ```bash
  flutter pub get
  ```
3. Rode o app:
  ```bash
  flutter run
  ```