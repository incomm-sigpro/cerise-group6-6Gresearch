#!/bin/bash

set -e

# Variables
domain="magma.test"
interface_ip="192.168.4.2/24"
interface_gw="192.168.4.1"
repo_branch="v1.8"

read -p "Deseja limpar instalações anteriores do Magma? (y/n): " confirm
if [ "$confirm" == "y" ]; then
  docker stop $(docker ps -aq)
  docker rm $(docker ps -aq)
  docker volume prune -f
  sudo rm -rf ~/magma ~/secrets /var/opt/magma
  sudo rm /etc/netplan/70-secondary-itf.yaml
fi

# Step 1: Install dependencies
sudo apt update
sudo apt install -y git curl python3 docker.io docker-compose net-tools netplan.io

# Step 2: Clone Magma
cd ~
git clone https://github.com/magma/magma.git
cd magma
git checkout $repo_branch

# Step 3: Generate Certificates
mkdir -p ~/secrets/certs
cd ~/secrets/certs
bash ~/magma/orc8r/cloud/deploy/scripts/self_sign_certs.sh $domain
bash ~/magma/orc8r/cloud/deploy/scripts/create_application_certs.sh $domain
mkdir -p ~/magma/.cache/test_certs/
cp -r * ~/magma/.cache/test_certs/
chmod -R +r ~/magma/.cache/test_certs/

# Step 4: Build Orchestrator Docker images
cd ~/magma/orc8r/cloud/docker
python3 build.py --all

# Step 6: Run Orchestrator
python3 run.py

# Step 7: Launch NMS (UI)
cd ~/magma/nms
docker-compose up -d

# Step 8: Create default admin
bash scripts/dev_setup.sh

# Step 9: Setup AGW certificates
sudo mkdir -p /var/opt/magma/certs
sudo mkdir -p /var/opt/magma/configs
sudo cp ~/magma/.cache/test_certs/rootCA.pem /var/opt/magma/certs/

# Step 10: Configure control_proxy.yml
sudo tee /var/opt/magma/configs/control_proxy.yml > /dev/null <<EOF
cloud_address: controller.$domain
cloud_port: 7443
bootstrap_address: bootstrapper-controller.$domain
bootstrap_port: 7444
fluentd_address: fluentd.$domain
fluentd_port: 24224

rootca_cert: /var/opt/magma/certs/rootCA.pem
EOF

rm agw_install_docker.sh*

# Step 11: Download and patch AGW installer
wget https://github.com/magma/magma/raw/$repo_branch/lte/gateway/deploy/agw_install_docker.sh
chmod 777 agw_install_docker.sh


# Step 12: Apply insecure apt config
sudo tee /etc/apt/apt.conf.d/99AllowInsecureRepositories > /dev/null <<EOF
Acquire::AllowInsecureRepositories "true";
APT::Get::AllowUnauthenticated "true";
EOF

wget https://robohub.eng.uwaterloo.ca/mirror/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb


# Step 13: Run AGW installer once (should fail, as expected)
sudo ./agw_install_docker.sh
sudo sed -i 's/RERUN=0/RERUN=1/' agw_install_docker.sh

# Step 14: Patch Ansible playbook to skip broken GPG key steps
sudo sed -i '60,91d' /opt/magma/lte/gateway/deploy/roles/magma_deploy/tasks/main.yml
sudo sed -i '87,87d' /opt/magma/lte/gateway/deploy/roles/magma_deploy/tasks/main.yml

# Step 15: Rerun AGW installer
sudo ./agw_install_docker.sh

# Step 16: Configure netplan (eth1)
sudo tee /etc/netplan/70-secondary-itf.yaml > /dev/null <<EOF
network:
  ethernets:
    eth1:
      addresses:
      - $interface_ip
      routes:
      - to: 0.0.0.0/0
        via: $interface_gw
        metric: 1000
      nameservers:
        addresses:
        - $interface_gw
        search: []
  version: 2
EOF

sudo netplan apply

# Step 17: Check containers and get AGW info
docker ps -a
docker exec magmad show_gateway_info.py
