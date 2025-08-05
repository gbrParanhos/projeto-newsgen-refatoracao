

Nomeação de funções e variáveis;
Semântica de funções e variáveis;
DRY (Don’t Repeat Yourself);
Tamanho de função;
Complexidade de lógica booleana.

# arquivo: news-repository.ts
- função getNoticias() não mantém o padrão inglês;
- função getNoticiaById() não mantém o padrão inglês;
- função createNoticia() não mantém o padrão inglês;
- função updateNoticia() não mantém o padrão inglês;
- função removeNoticia() não mantém o padrão inglês;
- tipo AlterNewsData desnecessário por ser idêntico ao CreateNewsData;

# arquivo: news-service.ts

- A responsabilidade da construção do erro não precisa ser da service;
- Função validate tem magic number de minimo de caracteres
- Variavel newsWithTitle é pouco semântica
- Variaveis currentDate e publicationData não precisam ser convertidas para a lógica booleana
- Parametro da função validate é pouco semântico isNew na verdade se refere ao título sendo melhor isNewTitle

# arquivo: news-controller.ts

- A lógica de validação de ID é repetida em vários lugares, poderia ser extraída para uma função utilitária, além disso é pouco semântica quando não declarada e usada direta no if.