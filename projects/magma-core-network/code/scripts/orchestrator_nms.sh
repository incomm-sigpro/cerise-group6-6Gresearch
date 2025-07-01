#!/bin/bash

set -e

echo "🔧 Updating system..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installing dependencies..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg2 lsb-release

echo "🔐 Adding Docker’s official GPG key..."
sudo rm -f /etc/apt/keyrings/docker.gpg
sudo rm -rf /etc/apt/keyrings
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "📁 Setting up the Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "🔄 Updating package index and installing Docker..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "🐳 Verifying Docker installation..."
docker --version
docker compose version

echo "👤 Adding current user to Docker group..."
if ! getent group docker > /dev/null; then
  sudo groupadd docker
fi
sudo usermod -aG docker $USER

echo "⚠️ Please log out and log back in to apply Docker group changes."
echo "   Or run 'newgrp docker' to apply immediately."
newgrp docker

echo "📂 Preparing Magma repository..."
cd ~
rm -rf ~/magma
mkdir -p ~/magma
cp -r ~/magma_drive/magma/* ~/magma
cd ~/magma/orc8r/cloud/docker

echo "🔧 Ensuring build script is executable..."
chmod +x build.py

echo "⚙️ Building all Magma Docker images..."
./build.py --all

echo "🚀 Starting the Magma Orchestrator..."
./run.py

echo "🌐 Setting up the NMS (Network Management System)..."
cd ~/magma/nms
docker-compose up --build -d

echo "🔑 Creating default admin user..."
bash scripts/dev_setup.sh

echo "✅ Setup completed successfully."
