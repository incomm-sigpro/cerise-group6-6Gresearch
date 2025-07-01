#!/bin/bash
set -e

echo "🔧 Configurando rede com ifupdown..."

# Instalar ifupdown
sudo apt update
sudo apt install -y ifupdown

echo "🔧 Desabilitando Netplan"

# Remover Netplan
sudo rm -f /etc/netplan/*.yaml
sudo systemctl disable systemd-networkd-wait-online.service || true
sudo systemctl disable systemd-networkd || true
sudo systemctl stop systemd-networkd || true
sudo systemctl disable systemd-resolved.service || true
sudo systemctl stop systemd-resolved.service || true

echo "🔧 Configurando ifupdown"

# Criar arquivo de configuração de rede
sudo rm -f /etc/network/interfaces
echo "# /etc/network/interfaces

source-directory /etc/network/interfaces.d
" | sudo tee /etc/network/interfaces

# Criar diretório de interfaces se não existir
sudo mkdir -p /etc/network/interfaces.d

# Criar arquivos de configuração de interfaces
echo "auto eth0
auto eth0
iface eth0 inet static
    address 200.137.220.59
    netmask 255.255.255.0
    gateway 200.137.220.1
    dns-nameservers 8.8.8.8 1.1.1.1
" | sudo tee /etc/network/interfaces.d/eth0

echo "auto eth1
auto eth1
iface eth1 inet static
    address 10.0.2.1
    netmask 255.255.255.0
" | sudo tee /etc/network/interfaces.d/eth1

echo "✅ Configuração de rede com ifupdown concluída."

# Finalizando a configuração do ifupdown
sudo systemctl enable networking.service
sudo systemctl restart networking.service

echo "🔄 Reiniciando serviços de rede..."