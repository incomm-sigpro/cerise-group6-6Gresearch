#!/bin/bash

set -e

echo "🔧 [1/8] Instalando dependências para compilar o Python..."
sudo apt update
sudo apt install -y \
  make build-essential libssl-dev zlib1g-dev \
  libbz2-dev libreadline-dev libsqlite3-dev wget curl \
  llvm libncursesw5-dev xz-utils tk-dev \
  libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git unzip

echo "📦 [2/8] Clonando o repositório do pyenv em ~/.pyenv..."
if [ -d "$HOME/.pyenv" ]; then
  echo "⚠️  Diretório ~/.pyenv já existe. Pulando clone."
else
  git clone https://github.com/pyenv/pyenv.git ~/.pyenv
fi

echo "🛠️ [3/8] Configurando variáveis de ambiente para pyenv..."
SHELL_RC="$HOME/.bashrc"
if [[ "$SHELL" == */zsh ]]; then
  SHELL_RC="$HOME/.zshrc"
fi

if ! grep -q 'pyenv init' "$SHELL_RC"; then
  cat <<EOF >> "$SHELL_RC"

# >>> pyenv config >>>
export PYENV_ROOT="\$HOME/.pyenv"
[[ -d "\$PYENV_ROOT/bin" ]] && export PATH="\$PYENV_ROOT/bin:\$PATH"
eval "\$(pyenv init - bash)"
# <<< pyenv config <<<
EOF
  echo "✅ pyenv configurado em $SHELL_RC"
else
  echo "⚠️  pyenv já configurado em $SHELL_RC"
fi

echo "🔁 [4/8] Aplicando configuração de ambiente na sessão atual..."
export PYENV_ROOT="$HOME/.pyenv"
[[ -d "$PYENV_ROOT/bin" ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init - bash)"

echo "🐍 [5/8] Instalando Python 3.11.13 com pyenv..."
if pyenv versions | grep -q "3.11.13"; then
  echo "⚠️  Python 3.11.13 já está instalado."
else
  pyenv install 3.11.13
fi

echo "📌 [6/8] Definindo Python 3.11.13 como padrão global..."
pyenv global 3.11.13

echo "📦 [7/8] Criando ambiente virtual em ~/venv..."
python3 -m venv ~/.venv

echo "🔗 [8/8] Ativando ambiente virtual e instalando gdown..."
source ~/.venv/bin/activate
pip install --upgrade pip
pip install gdown

echo "✅ Instalação concluída com sucesso!"
echo "📌 Versão ativa do Python:"
python --version

echo "📦 Download do diretório magma"
mkdir -p ~/magma_drive
cd ~/magma_drive
# Download the magma directory from Google Drive
gdown https://drive.google.com/uc?id=19Vn80XCvW4FZCRspA5wV8pGqyjhCo_8y

echo "📂 Extraindo o conteúdo do arquivo zip..."
unzip magma.zip
sudo rm magma.zip