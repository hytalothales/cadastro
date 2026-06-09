# Documentação do Diagrama de Classes - Backend Java

Este documento contém a representação visual e estrutural das classes do backend do projeto, desenvolvidas com o framework Spring Boot.

---

## 1. Diagrama Ilustrativo da Arquitetura
Esta é uma ilustração conceitual e estilizada em 3D da arquitetura de classes do sistema para uso em apresentações ou capas de documentações.

![Ilustração Gráfica do Diagrama de Classes](./class_diagram_illustration.png)

---

## 2. Diagrama de Classes Detalhado (SVG Vetorial)
Abaixo está o diagrama de classes exato gerado em formato SVG vetorial. Ele contém todos os atributos, métodos, modificadores de acesso, estereótipos do Spring Boot e relacionamentos estruturais exatos do seu código Java.

![Diagrama de Classes Exato SVG](./diagrama_classes.svg)

> [!TIP]
> Você pode abrir o arquivo [diagrama_classes.svg](./diagrama_classes.svg) diretamente em qualquer navegador web para visualizá-lo em tela cheia, salvá-lo como imagem ou integrá-lo a relatórios HTML.

---

## 3. Diagrama em Formato Mermaid.js
Você pode copiar o código abaixo e colar diretamente no seu arquivo `README.md` do GitHub, GitLab ou no Notion. Ele será renderizado automaticamente como um diagrama interativo.

```mermaid
classDiagram
    direction TB

    %% Classes
    class CadastroApplication {
        <<SpringBootApplication>>
        +main(args: String[]) void
        +corsConfigurer() WebMvcConfigurer
    }

    class AuthController {
        <<RestController>>
        -repository: MemoriaRepository
        +login(credenciais: Map) ResponseEntity
        +register(dados: Map) ResponseEntity
    }

    class ArquivoController {
        <<RestController>>
        -repository: MemoriaRepository
        +getArquivos(identity: String) ResponseEntity
        +uploadArquivo(identity: String, arquivo: Arquivo) ResponseEntity
        +getArquivosPorObra(obra: String) ResponseEntity
        +uploadArquivoPorObra(obra: String, arquivo: Arquivo) ResponseEntity
    }

    class MemoriaRepository {
        <<Repository>>
        -usuarios: List~Usuario~
        +MemoriaRepository()
        +findAll() List~Usuario~
        +findByIdentity(identity: String) Optional~Usuario~
        +save(usuario: Usuario) void
    }

    class Usuario {
        <<abstract>>
        #name: String
        #identity: String
        #password: String
        #files: List~Arquivo~
        #role: String
        #obra: String
        +Usuario()
        +Usuario(name, identity, password, role, obra)
        +getName() String
        +setName(name: String) void
        +getIdentity() String
        +setIdentity(identity: String) void
        +getFiles() List~Arquivo~
        +setFiles(files: List~Arquivo~) void
        +getObra() String
        +setObra(obra: String) void
        +getRole() String
        +setRole(role: String) void
    }

    class Admin {
        +Admin()
        +Admin(name, identity, password)
    }

    class Cliente {
        +Cliente()
        +Cliente(name, identity, password)
        +Cliente(name, identity, password, obra)
    }

    class Arquivo {
        <<Entity>>
        -name: String
        -nf: String
        -date: String
        -timestamp: long
        -content: String
        +Arquivo()
        +Arquivo(name, nf, date, timestamp, content)
        +getName() String
        +setName(name: String) void
        +getNf() String
        +setNf(nf: String) void
        +getDate() String
        +setDate(date: String) void
        +getTimestamp() long
        +setTimestamp(timestamp: long) void
        +getContent() String
        +setContent(content: String) void
    }

    %% Relationships
    Usuario <|-- Admin : Herança
    Usuario <|-- Cliente : Herança
    Usuario "1" *-- "many" Arquivo : Agregação
    MemoriaRepository "1" *-- "many" Usuario : Agregação
    AuthController ..> MemoriaRepository : Dependência (uses)
    ArquivoController ..> MemoriaRepository : Dependência (uses)
```

---

## 4. Estrutura do Backend
O backend do projeto é construído em cima da arquitetura clássica MVC (Model-View-Controller) simplificada e orientada a serviços usando Spring Boot:

1. **Camada de Modelos (Domain/Model)**:
   - `Usuario`: Classe abstrata que serve de base para os tipos de usuários do sistema. Define propriedades comuns como nome, identificação, senha, papel (role), obra atribuída e a lista de arquivos.
   - `Admin` e `Cliente`: Subclasses que estendem `Usuario`, especializando o comportamento e definindo papéis padrão ("admin" e "cliente").
   - `Arquivo`: Representa os metadados e conteúdo (Base64) de um documento/nota fiscal anexado por um usuário.

2. **Camada de Acesso a Dados (Repository)**:
   - `MemoriaRepository`: Um repositório em memória anotado com `@Repository` que gerencia a persistência volátil dos usuários do sistema. Ele inicializa o usuário padrão do sistema (`admin`/`admin`).

3. **Camada de Controle (Controllers/API)**:
   - `AuthController`: Expõe os endpoints `/api/auth/login` e `/api/auth/register` para autenticação e registro de novos clientes.
   - `ArquivoController`: Expõe endpoints `/api/arquivos` para listagem e upload de arquivos por identificador de usuário ou por obra.
