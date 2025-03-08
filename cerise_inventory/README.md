# cerise-group3-5GOpenRAN

Este repositório contém o código, documentação e recursos necessários para o desenvolvimento de um sistema Open RAN 5G. Open RAN (Radio Access Network) representa uma nova abordagem para redes móveis, promovendo uma arquitetura aberta e desagregada para permitir uma maior flexibilidade, interoperabilidade e inovação nas redes de quinta geração (5G).

## Sumário

- [cerise-group3-5GOpenRAN](#cerise-group3-5gopenran)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
  - [Objetivo](#objetivo)
  - [Recursos](#recursos)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Uso](#uso)
  - [Documentação](#documentação)
  - [Contribuição](#contribuição)
  - [Licença](#licença)
  - [Contato](#contato)

## Descrição

Este projeto visa desenvolver e simular uma arquitetura Open RAN 5G utilizando ferramentas e bibliotecas modernas. A implementação foca em componentes modulares e configuráveis, permitindo a integração com diferentes soluções de hardware e software, conforme as diretrizes da arquitetura Open RAN.

## Objetivo

O objetivo deste projeto é:

1. Explorar e implementar os princípios do Open RAN no contexto de redes 5G.
2. Oferecer uma base modular e extensível para testes e simulações de componentes RAN.
3. Integrar elementos de código para suporte a operações RAN em ambientes de rede virtualizados e na borda.

## Recursos

- **Módulos Open RAN**: Implementação dos principais módulos do Open RAN (DU, CU, RU).
- **Simulações e Testes**: Scripts para simulação de tráfego e condições de rede.
- **Compatibilidade**: Suporte a integrações com diferentes APIs e plataformas de redes virtuais.

## Pré-requisitos

- **Python** >= 3.8
- **Docker** >= 20.10
- **Bibliotecas**:
  - `requests`
  - `numpy`
  - `scipy`

Você pode instalar as bibliotecas com o seguinte comando:

```bash
pip install -r requirements.txt
```

Para simulações adicionais, recomenda-se uma plataforma de virtualização, como **VMware** ou **VirtualBox**.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/jakunzler/cerise-group3-5GOpenRAN.git
   cd cerise-group3-5GOpenRAN
   ```

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. Inicie o ambiente Docker:

   ```bash
   docker-compose up -d
   ```

## Uso

1. Execute o script principal:

   ```bash
   python run.py
   ```

2. Acesse a interface web no navegador em `http://localhost:8000`.

3. Utilize a documentação para mais informações sobre parâmetros e configurações.

## Documentação

A documentação completa está disponível na pasta `documents`. Inclui:

- **Descrição dos Módulos**: Informações sobre o DU, CU, RU e suas implementações.
- **API**: Documentação para chamadas de API e endpoints REST.
- **Exemplos de Código**: Scripts de exemplo para simulação e testes de componentes.
- **Configuração Avançada**: Como personalizar as configurações do Open RAN para diferentes cenários.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o projeto.
2. Crie uma branch para sua funcionalidade (`git checkout -b minha-funcionalidade`).
3. Faça commit das suas mudanças (`git commit -m 'Adicionar nova funcionalidade'`).
4. Faça push para a branch (`git push origin minha-funcionalidade`).
5. Abra um Pull Request.

Para maiores informações, leia o guia de contribuição na pasta `CONTRIBUTING.md`.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

- **Nome**: Dr. Jonas Augusto Kunzler
- **E-mail**: <k_jonasaugusto@ufg.br>
