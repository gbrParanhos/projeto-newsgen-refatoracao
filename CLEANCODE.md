

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
