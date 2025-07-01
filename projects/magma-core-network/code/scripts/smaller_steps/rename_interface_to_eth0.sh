#!/bin/bash
set -e

echo "🔧 Renomeando interface existente para eth0..."

# Descobrir a interface de rede atual (ignorar lo e eth1)
DEFAULT_IFACE=$(ip -o link | awk -F': ' '{print $2}' | grep -v -E "lo|eth1" | head -n 1)

if [ -z "$DEFAULT_IFACE" ]; then
  echo "❌ Nenhuma interface encontrada para renomear."
  exit 1
fi

# Obter o endereço MAC da interface atual
MAC=$(cat /sys/class/net/$DEFAULT_IFACE/address)

echo "➡️ Interface atual: $DEFAULT_IFACE"
echo "➡️ Endereço MAC: $MAC"

# Criar regra de udev para renomear para eth0
echo "SUBSYSTEM==\"net\", ACTION==\"add\", ATTR{address}==\"$MAC\", NAME=\"eth0\"" | sudo tee /etc/udev/rules.d/10-rename-eth0.rules

# Informar o usuário
echo "✅ Regra udev criada: /etc/udev/rules.d/10-rename-eth0.rules"
echo "🔁 Reinicie o sistema para aplicar a mudança de nome."

sudo reboot