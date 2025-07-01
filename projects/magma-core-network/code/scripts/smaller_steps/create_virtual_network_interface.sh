#!/bin/bash
set -e

echo "🔧 Criando interface virtual eth1 (dummy)..."

# Ativar o módulo dummy no boot
echo "dummy" | sudo tee /etc/modules-load.d/dummy.conf

# Carregar o módulo dummy agora
sudo modprobe dummy

# Criar a interface dummy eth1
sudo ip link add eth1 type dummy || echo "Interface eth1 já existe."

# Ativar a interface
sudo ip link set eth1 up

echo "✅ Interface virtual eth1 criada com sucesso."
