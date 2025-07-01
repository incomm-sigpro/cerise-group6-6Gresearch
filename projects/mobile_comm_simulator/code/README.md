# Estrutura do Projeto de Simulação DOA - Análise do `run.py`

## Visão Geral do `run.py`

O arquivo `run.py` é o ponto de entrada principal da aplicação de Estimação de Direção de Chegada (DOA - Direction of Arrival). Este arquivo serve como um _launcher_ (inicializador) que pode iniciar a aplicação em diferentes modos dependendo dos argumentos de linha de comando fornecidos.

```python
#!/usr/bin/env python
"""
Created on April 2025, updated on May 2025

@author: Jonas Augusto Kunzler (k_jonasaugusto@ufg.br)

DOA Estimation Application Launcher

This script serves as the main entry point for the DOA estimation application.
It can launch either the API server or the CLI interface based on command line arguments.
"""
```

## Funcionalidades Principais

O arquivo `run.py` é projetado para:

1. **Configurar o ambiente de execução** - Inicializa o logging, carrega as configurações apropriadas com base no ambiente (development, production, testing)
2. **Analisar argumentos de linha de comando** - Processa opções como `--api`, `--cli` e `--env`
3. **Iniciar a aplicação no modo apropriado** - Executa o servidor API ou a interface CLI conforme solicitado

## Estrutura de Código

O arquivo está organizado nas seguintes funções principais:

### `setup_logging()`

Esta função configura o sistema de logging da aplicação:

```python
def setup_logging():
    """Set up logging."""
    # Create logs directory if it doesn't exist
    Config.LOGS_DIR.mkdir(exist_ok=True, parents=True)

    # Configure logging
    logging.basicConfig(
        level=getattr(logging, Config.LOG_LEVEL),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(),
            logging.FileHandler(str(Config.LOGS_DIR / "app.log")),
        ],
    )
    return logging.getLogger(__name__)
```

### `parse_args()`

Esta função define e processa os argumentos de linha de comando:

```python
def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description=f"{Config.APP_NAME} - A research platform for Direction of Arrival estimation algorithms",
    )

    # Mode selection
    mode_group = parser.add_mutually_exclusive_group()
    mode_group.add_argument("--api", action="store_true", help="Run in API server mode")
    mode_group.add_argument("--cli", action="store_true", help="Run in CLI mode")

    # Environment selection
    parser.add_argument(
        "--env",
        type=str,
        default=os.environ.get("APP_ENV", "development"),
        choices=["development", "production", "testing"],
        help="Application environment",
    )
    
    # Código para determinar o modo padrão
    # ...

    return args, remaining
```

### `main()`

A função principal que coordena a execução da aplicação:

```python
def main():
    """Main function."""
    # Set up logging
    logger = setup_logging()

    # Parse command line arguments
    args, remaining = parse_args()

    # Set environment variable for child processes
    os.environ["APP_ENV"] = args.env

    logger.info(f"Starting {Config.APP_NAME} v{Config.APP_VERSION}")
    logger.info(f"Environment: {args.env}")

    # Determina qual modo executar (API ou CLI)
    if args.api:
        # Código para executar no modo API
        # ...
    elif args.cli:
        # Código para executar no modo CLI
        # ...
```

## Sistema de Configuração

O projeto utiliza um sistema de configuração baseado em classes que varia conforme o ambiente:

1. **BaseConfig** (`configs/base_config.py`) - Contém configurações comuns a todos os ambientes
2. **Configurações específicas de ambiente** - Extendem a BaseConfig:
   - `configs/development.py` - Para desenvolvimento
   - `configs/production.py` - Para produção
   - `configs/testing.py` - Para testes

O ambiente é determinado pela variável de ambiente `APP_ENV` ou pelo argumento `--env`.

## Modos de Execução

O `run.py` suporta dois modos principais de execução:

### Modo API

Quando executado com `--api` ou como padrão (se API_ENABLED for verdadeiro na configuração), inicia um servidor web Flask que fornece:

- Endpoints de API para simulações DOA
- Interface web para interação via navegador
- Visualização e comparação de resultados

### Modo CLI

Quando executado com `--cli`, inicia a interface de linha de comando que permite:

- Executar simulações únicas
- Realizar varreduras de SNR (Signal-to-Noise Ratio)
- Executar testes de resolução
- Comparar diferentes algoritmos DOA

## Fluxo de Execução

1. O script é chamado (`python run.py [argumentos]`)
2. O ambiente é configurado (development, production, testing)
3. O modo é determinado (API ou CLI)
4. Dependendo do modo, os respectivos módulos são importados e executados:
   - `run_api.py` para o modo API
   - `run_cli.py` para o modo CLI

## Integração com o Sistema de Simulação

O `run.py` não executa diretamente as simulações, mas inicia os módulos apropriados que usam:

- `app/main.py` - Inicializa os módulos necessários para a simulação, e.g., array_geometry, signal_model, noise_distribution.
- Algoritmos DOA implementados em `services/algorithms/`
- Geradores de sinal e ruído em `models/repositories/`

## Conclusão

O arquivo `run.py` serve como um ponto de entrada flexível para a aplicação de pesquisa DOA, permitindo diferentes modos de operação e configurações de ambiente. Ele coordena a inicialização apropriada do sistema e delega a execução aos módulos especializados, seguindo princípios de design modular e separação de responsabilidades.
