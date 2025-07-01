```md
src/
├── app/
│   ├── composer/
│   │   ├── __init__.py
│   ├── main/
│   │   ├── __init__.py
│   │   ├── main.py
│   ├── middlewares/
│   │   ├── __init__.py
├── controllers/
│   ├── doa_methods/
│   │   ├── __init__.py
│   │   ├── music.py
│   │   ├── esprit.py
│   │   ├── capon.py
│   ├── interfaces/
│   │   ├── __init__.py
│   │   ├── doa_methods/
│   │   │   ├── __init__.py
├── models/
│   ├── __init__.py
│   ├── entities/
│   │   ├── __init__.py
│   │   ├── doa_methods.py
│   │   │   ├── __init__.py
│   │   │   ├── capon.py
│   │   │   ├── esprit.py
│   │   │   ├── matrix_norms.py
│   │   │   ├── music.py
│   │   │   ├── sead.py
│   │   ├── signal_model
│   │   │   ├── __init__.py
│   │   │   ├── ula.py
│   │   │   ├── nested_array.py
│   │   │   ├── coprime_array.py
├── tests/
│   ├── __init__.py
├── views/
│   ├── __init__.py
│   ├── plot_view.py
├── run.py
```

### __📌 Comandos Úteis no Pipenv__

#### __1. Verificar pacotes instalados no ambiente__

```bash
pipenv graph
```

#### __2. Instalar pacotes no ambiente virtual__

```bash
pipenv install numpy matplotlib scipy
```

Se precisar de pacotes específicos para DOA ou Machine Learning, adicione:

```bash
pipenv install scikit-learn pandas seaborn
```

#### __3. Rodar um script Python dentro do ambiente__

```bash
pipenv run python meu_script.py
```

#### __4. Abrir o shell Python dentro do ambiente__

```bash
pipenv run python
```

#### __5. Sair do ambiente virtual__

```bash
exit
```

ou

```bash
deactivate
```

#### __6. Remover pacotes do ambiente__

```bash
pipenv uninstall numpy
```

#### __7. Gerar um `requirements.txt`__

Se precisar exportar os pacotes para outra pessoa instalar com `pip`:

```bash
pipenv requirements > requirements.txt
```

#### __8. Carregar o ambiente virtual__

```bash
pipenv shell
```
