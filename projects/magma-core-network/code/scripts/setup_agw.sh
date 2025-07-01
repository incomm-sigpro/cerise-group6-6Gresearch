#!/bin/bash

set -e

# 📌 Certifique-se de que as variáveis estejam definidas
if [[ -z "$domain" || -z "$repo_branch" ]]; then
  echo "❌ As variáveis \$domain e \$repo_branch precisam estar definidas antes de executar este script."
  exit 1
fi

echo "🔐 Setup AGW certificates..."
sudo mkdir -p /var/opt/magma/certs
sudo mkdir -p /var/opt/magma/configs
sudo cp ~/magma/.cache/test_certs/rootCA.pem /var/opt/magma/certs/

echo "📝 Creating control_proxy.yml configuration..."
sudo tee /var/opt/magma/configs/control_proxy.yml > /dev/null <<EOF
cloud_address: controller.$domain
cloud_port: 7443
bootstrap_address: bootstrapper-controller.$domain
bootstrap_port: 7444
fluentd_address: fluentd.$domain
fluentd_port: 24224

rootca_cert: /var/opt/magma/certs/rootCA.pem
EOF

echo "🧹 Cleaning up old installer script if it exists..."
rm -f agw_install_docker.sh*

echo "⬇️ Downloading and preparing AGW installer..."
wget -q https://github.com/magma/magma/raw/$repo_branch/lte/gateway/deploy/agw_install_docker.sh
chmod +x agw_install_docker.sh

echo "⚠️ Applying insecure APT config (use only for legacy dependencies)..."
sudo tee /etc/apt/apt.conf.d/99AllowInsecureRepositories > /dev/null <<EOF
Acquire::AllowInsecureRepositories "true";
APT::Get::AllowUnauthenticated "true";
EOF

echo "⬇️ Downloading legacy OpenSSL library (libssl1.1)..."
wget -q https://robohub.eng.uwaterloo.ca/mirror/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb || true

echo "🚧 Running AGW installer (expected to fail first time)..."
sudo ./agw_install_docker.sh || echo "⚠️ Installer failed as expected on first run."

echo "✅ Script completed."
