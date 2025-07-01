# Magma Execution Roadmap

This document outlines the recommended sequence of steps to **set up and run the Magma platform**, including both the **Orchestrator (Orc8r)** and **Access Gateway (AGW)** components. These steps rely on shell scripts available under the `scripts/` and `scripts/smaller_steps/` directories.

---

## 🔧 Orchestrator Setup (Orc8r)

To initialize the Orchestrator and its NMS (Network Management System), follow these steps:

### 1. Download Google Drive Files

Run the following script to install the `gdown` tool and enable downloading of necessary resources from Google Drive:

```bash
./install_gdown.sh
```

### 2. Deploy the Orchestrator and NMS

Use the script below to set up the Orchestrator (Orc8r) and NMS:

```bash
./orchestrator_nms.sh
```

This step will bring up the core services required to manage and monitor the Magma network.

---

## 📡 Access Gateway Setup (AGW)

To configure and launch the AGW, proceed with the following steps:

### 1. Rename Interface to `eth0`

This script ensures that the main network interface is named `eth0`, which is required by the Magma configuration:

```bash
./rename_interface_to_eth0.sh
```

### 2. Setup Secondary Interface

Choose **one** of the two options below, depending on your environment:

* If your system has a physical secondary interface:

  ```bash
  ./rename_interface_to_eth1.sh
  ```

* If your system is virtualized and requires a software-defined interface:

  ```bash
  ./create_virtual_network_interface.sh
  ```

### 3. Set Up and Run AGW

Finally, run the main AGW setup script:

```bash
./setup_agw.sh
```

This script will configure the AGW services and launch the necessary containers to enable communication with the Orchestrator.

---

## ✅ Final Notes

* Make sure to execute all scripts with appropriate permissions:

  ```bash
  chmod +x *.sh
  ```
* It is recommended to run the scripts in the order presented to ensure correct dependency resolution.
* Validate network connectivity between AGW and Orc8r after setup.
