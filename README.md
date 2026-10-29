# Ecar Fleet Design System (EDS)

**Biblioteca de componentes reutilizáveis para o ecossistema Ecar Fleet.**

O Ecar Fleet Design System (EDS) é um projeto dedicado à criação, padronização, documentação e evolução dos componentes de interface utilizados nos produtos digitais da Ecar Fleet.

O objetivo é estabelecer uma base visual e técnica compartilhada, permitindo desenvolver interfaces com maior consistência, facilitar a manutenção do código e acelerar a criação de novas funcionalidades.

O projeto é mantido de forma independente da aplicação principal, possibilitando que os componentes sejam desenvolvidos, testados visualmente e documentados antes de sua adoção nos produtos da empresa.

---

## 1. Objetivo do projeto

O principal objetivo do EDS é construir uma biblioteca centralizada de componentes de interface reutilizáveis, acompanhada de documentação técnica e exemplos práticos de utilização.

Em aplicações que crescem ao longo do tempo, é comum que diferentes telas implementem soluções semelhantes de maneiras distintas. Botões, campos de formulário, modais, tabelas e outros elementos podem apresentar diferenças de aparência, comportamento e implementação, aumentando a complexidade da manutenção.

O Design System busca resolver esse problema por meio de componentes compartilhados, regras visuais consistentes e documentação acessível aos desenvolvedores.

### Objetivos específicos

- **Padronização visual:** estabelecer uma identidade visual consistente entre as interfaces.
- **Reutilização de código:** desenvolver componentes que possam ser utilizados em diferentes telas e funcionalidades.
- **Manutenibilidade:** centralizar estilos e comportamentos para facilitar ajustes e correções.
- **Produtividade:** reduzir a necessidade de implementar os mesmos elementos repetidamente.
- **Documentação técnica:** disponibilizar exemplos, propriedades, variações e estados dos componentes.
- **Acessibilidade:** incorporar boas práticas de acessibilidade desde a construção dos componentes.
- **Escalabilidade:** permitir que a biblioteca cresça de maneira organizada conforme surgirem novas necessidades.
- **Qualidade e consistência:** facilitar a validação visual dos componentes antes de sua integração às aplicações.

## 2. Escopo e funcionamento

O EDS será desenvolvido como um projeto independente, com seu próprio código-fonte, ambiente de desenvolvimento e documentação.

O Storybook será utilizado como ambiente de desenvolvimento e catálogo visual dos componentes. Nele, será possível visualizar diferentes variações de um componente, verificar seus estados e consultar exemplos de utilização sem depender da execução da aplicação principal.

A estrutura seguirá uma abordagem incremental:

1. Definir os fundamentos visuais da identidade Ecar Fleet.
2. Criar componentes reutilizáveis com interfaces bem definidas.
3. Documentar suas propriedades, variações e comportamentos.
4. Verificar sua apresentação em diferentes estados e cenários.
5. Evoluir a biblioteca de acordo com as necessidades reais das aplicações.
6. Preparar a integração e a distribuição dos componentes para reutilização em outros projetos.

A aplicação `ecarmanutencoes` não faz parte deste repositório. A intenção é que o EDS possa evoluir separadamente e, posteriormente, fornecer componentes compartilhados para essa e outras aplicações compatíveis.

## 3. Tecnologias e ferramentas

| Tecnologia ou ferramenta | Finalidade                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------- |
| React                    | Construção de componentes de interface reutilizáveis.                                   |
| TypeScript               | Tipagem estática, contratos explícitos e maior segurança no desenvolvimento.            |
| Vite                     | Ambiente de desenvolvimento e ferramenta de build do projeto.                           |
| Storybook                | Catálogo interativo, desenvolvimento isolado e documentação visual dos componentes.     |
| CSS                      | Implementação dos estilos e das variações visuais dos componentes.                      |
| Design Tokens            | Centralização de valores visuais, como cores, tipografia e outros padrões de interface. |
| Storybook Docs           | Organização e apresentação da documentação dos componentes.                             |
| Storybook Accessibility  | Apoio à identificação de problemas de acessibilidade nas interfaces documentadas.       |
| Git e GitHub             | Controle de versão, histórico de alterações e hospedagem do código-fonte.               |
| npm                      | Gerenciamento de dependências e execução dos scripts do projeto.                        |

As ferramentas de documentação e acessibilidade fazem parte do ambiente de desenvolvimento. A inclusão de uma ferramenta, por si só, não significa que todos os requisitos de documentação ou acessibilidade já tenham sido concluídos.

## 4. Identidade visual

O EDS utiliza a identidade visual da Ecar Fleet como referência para estabelecer padrões compartilhados entre os componentes.

Os fundamentos visuais incluem:

- **Cores:** paleta de marca, cores neutras e cores de apoio.
- **Tipografia:** definição de famílias tipográficas e hierarquia textual.
- **Espaçamento:** valores consistentes para organizar os elementos das interfaces.
- **Bordas e raios:** padrões para contornos e arredondamento de componentes.
- **Estados visuais:** representação de situações como foco, interação, desabilitado e variações de uso.
- **Consistência:** aplicação dos mesmos fundamentos em todos os componentes compatíveis.

Esses fundamentos são organizados em tokens de design, permitindo centralizar ajustes e reduzir a duplicação de valores nos estilos.

O tema do Storybook também é personalizado para aproximar o ambiente de documentação da identidade da Ecar Fleet.

## 5. Componentes e documentação

A biblioteca será organizada por componentes, com implementação, estilos e histórias de documentação correspondentes.

Sempre que aplicável, cada componente deverá apresentar:

- Descrição e finalidade.
- Propriedades disponíveis e respectivos tipos.
- Variações de aparência e tamanho.
- Estados de interação.
- Exemplos de utilização.
- Orientações de acessibilidade.
- Restrições e recomendações de uso.

### Componente implementado

**Button**

O componente `Button` é o primeiro elemento reutilizável da biblioteca. Sua implementação utiliza React e TypeScript e contempla:

- Variantes `primary` e `secondary`.
- Tamanhos `sm`, `md` e `lg`.
- Estado desabilitado.
- Propriedades compatíveis com os atributos nativos de um botão HTML.
- Estilização baseada nos padrões visuais do projeto.
- Histórias no Storybook para demonstrar suas principais variações.

A implementação inicial estabelece um padrão para a criação dos próximos componentes.

### Próximos componentes candidatos

A evolução da biblioteca poderá contemplar:

- Campos de texto e formulários.
- Seletores e caixas de seleção.
- Botões de alternância.
- Badges e indicadores de status.
- Alertas e notificações.
- Modais e diálogos.
- Tabelas e elementos de paginação.
- Componentes de navegação.
- Cards e elementos de apresentação de dados.

A inclusão desses componentes dependerá das necessidades das aplicações e da definição progressiva dos padrões do design system.

## 6. Estrutura do projeto

A organização atual segue uma estrutura baseada em componentes e configuração independente do Storybook.

```text
ecar-design-system/
├── .storybook/
│   ├── ecarTheme.ts
│   ├── main.ts
│   ├── manager.ts
│   └── preview.tsx
├── public/
│   └── assets/
│       └── brand/
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.stories.tsx
│   │       └── button.css
│   ├── styles/
│   │   └── tokens.css
│   └── ...
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Responsabilidade das principais áreas:**

- `.storybook/`: configurações do Storybook, tema visual e ambiente de apresentação dos componentes.
- `public/assets/brand/`: arquivos estáticos de identidade visual, como logotipos.
- `src/components/`: implementação dos componentes reutilizáveis e suas histórias.
- `src/styles/`: tokens e fundamentos visuais compartilhados.
- `package.json`: dependências e comandos de execução e build.
- `README.md`: documentação geral do projeto.

A estrutura poderá ser ajustada conforme a biblioteca crescer. A árvore acima representa a organização prevista para os arquivos principais, podendo ser atualizada quando novos módulos forem adicionados.

## 7. Como executar o projeto

### Pré-requisitos

- Node.js compatível com as dependências instaladas.
- npm.
- Git, para controle de versão.
- Editor de código de sua preferência.

### Instalação

Clone o repositório e acesse a pasta:

```bash
git clone https://github.com/SEU-USUARIO/ecar-design-system.git
cd ecar-design-system
```

Instale as dependências:

```bash
npm install
```

### Executar o Storybook

```bash
npm run storybook
```

O Storybook disponibilizará um endereço local no terminal, normalmente `http://localhost:6006`, para consultar os componentes e suas histórias.

### Executar o build da aplicação

```bash
npm run build
```

Esse comando verifica e gera a versão de produção do projeto de acordo com a configuração do Vite.

### Gerar o build do Storybook

```bash
npm run build-storybook
```

Esse comando gera a versão estática da documentação do Storybook, normalmente no diretório `storybook-static/`.

Os diretórios gerados pelos builds não devem ser versionados no Git, pois podem ser recriados a partir do código-fonte e das dependências.

## 8. Diretrizes de desenvolvimento

Para manter a qualidade e a consistência da biblioteca, o desenvolvimento seguirá estas diretrizes:

1. **Componentes pequenos e reutilizáveis:** cada componente deve ter uma responsabilidade clara.
2. **Tipagem explícita:** propriedades e contratos devem ser definidos com TypeScript.
3. **Estilos compartilhados:** utilizar tokens existentes sempre que aplicáveis, evitando valores repetidos sem necessidade.
4. **Documentação próxima ao código:** manter histórias e exemplos junto aos componentes correspondentes.
5. **Acessibilidade:** considerar semântica HTML, navegação por teclado, foco e identificação de elementos.
6. **Compatibilidade:** evitar alterações desnecessárias que quebrem componentes ou consumidores existentes.
7. **Evolução incremental:** priorizar componentes com utilidade concreta para as aplicações.
8. **Controle de versão:** registrar alterações em commits objetivos e manter o repositório organizado.

Quando um componente existente precisar ser modificado, suas variações e usos documentados deverão ser considerados para reduzir o risco de regressões.

## 9. Resultado esperado

O resultado esperado é uma biblioteca de componentes de interface confiável, documentada e preparada para reutilização nas aplicações do ecossistema Ecar Fleet.

Ao atingir sua maturidade, o EDS deverá permitir que os desenvolvedores:

- Consultem um catálogo centralizado de componentes.
- Identifiquem rapidamente as propriedades e os usos de cada elemento.
- Reutilizem implementações consistentes em vez de reconstruir os mesmos padrões.
- Evoluam a identidade visual de maneira centralizada.
- Validem estados e variações antes de integrar componentes às aplicações.
- Reduzam retrabalho e divergências visuais entre telas.
- Compartilhem melhorias entre projetos que adotem a biblioteca.

A longo prazo, o objetivo é estabelecer uma base comum de interface para os produtos da Ecar Fleet, com processos de evolução e distribuição que permitam reutilizar os componentes de forma controlada.

A adoção dessa base deverá ocorrer gradualmente, respeitando a arquitetura e as necessidades de cada aplicação.

## 10. Roadmap

O desenvolvimento será conduzido em etapas, priorizando a criação de uma base sustentável antes da ampliação da biblioteca.

- [x] Criar o projeto independente com React, TypeScript e Vite.
- [x] Configurar o ambiente de desenvolvimento do Storybook.
- [x] Personalizar o tema do Storybook com a identidade visual Ecar Fleet.
- [x] Criar a base inicial de tokens de design.
- [x] Implementar o primeiro componente reutilizável (`Button`).
- [x] Documentar as principais variações do componente no Storybook.
- [x] Configurar o repositório Git e o controle de versão.
- [ ] Revisar e consolidar os fundamentos visuais.
- [ ] Expandir a biblioteca com componentes prioritários.
- [ ] Ampliar a documentação de propriedades, estados e acessibilidade.
- [ ] Definir estratégia de testes para os componentes.
- [ ] Definir o processo de versionamento e distribuição da biblioteca.
- [ ] Planejar a integração gradual com a aplicação `ecarmanutencoes`.
- [ ] Estabelecer critérios de manutenção, revisão e evolução do design system.

As etapas concluídas representam a base inicial do projeto. As demais são metas de evolução, e não funcionalidades que já estejam necessariamente disponíveis.

## 11. Repositório e manutenção

O código-fonte é mantido em um repositório Git independente da aplicação principal.

O histórico de alterações permite acompanhar a evolução dos componentes, revisar decisões de implementação e estabelecer uma base para futuras contribuições.

Alterações relevantes devem ser acompanhadas de documentação atualizada e, quando aplicável, de histórias que demonstrem o comportamento esperado.

**Projeto:** Ecar Fleet Design System (EDS)  
**Tecnologias principais:** React, TypeScript, Vite e Storybook  
**Finalidade:** padronização visual, reutilização de componentes e documentação técnica das interfaces Ecar Fleet.

---

_O Ecar Fleet Design System está em desenvolvimento. Sua evolução será guiada pelas necessidades dos produtos, pela consistência visual e pela qualidade técnica dos componentes compartilhados._
