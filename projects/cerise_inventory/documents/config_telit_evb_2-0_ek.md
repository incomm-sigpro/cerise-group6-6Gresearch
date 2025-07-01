# Telit EVB 2.0 Evaluation Kit

## Configurando o kit em um "Pop OS!"

---

### 1. **Conexão Física e Preparação**

#### **a. Montagem das Placas**

1. Insira o módulo **Telit FN990A40** no **slot M.2** da **Interface TLB**.
2. Conecte a **Interface TLB** à **Telit EVB 2.0 Evaluation Kit** usando os conectores apropriados.

#### **b. Conexão das Antenas**

1. **Cuidados com os conectores IPEX**:
   - Manuseie os conectores IPEX/U.FL com ferramentas adequadas para evitar danos.
   - Certifique-se de encaixar as antenas firmemente e sem inclinação.

2. **Posicionamento das Antenas**:
   - Conecte as antenas correspondentes:
     - **ANT0**: Principal para transmissão e recepção.
     - **ANT1**: Diversidade ou MIMO.
     - **ANT2/ANT3**: Para configurações avançadas de 5G MIMO.

#### **c. Alimentação e Conexão USB**

1. Ligue a EVB 2.0 à fonte de alimentação (12V).
2. Conecte a placa ao computador usando o cabo **USB 3.0** para garantir a largura de banda necessária.

#### **d. Cuidados Durante o Manuseio**

1. Sempre use uma **pulseira antiestática** e uma **manta eletrostática**.
2. Manuseie o módulo pelas bordas para evitar contato direto com os circuitos.
3. Evite desconectar antenas ou cabos durante o uso.

---

### 2. **Verifique os Requisitos do Sistema**

Certifique-se de que seu sistema Linux tenha os seguintes pacotes instalados para interagir com dispositivos seriais e modems:

- `ModemManager`
- `minicom` ou `screen`
- `usb-modeswitch`
- `python3` (para scripts adicionais)

Na ausência de algum item, instale-os com os comando:

```bash
sudo apt update
sudo apt install modemmanager
sudo apt install minicom
sudo apt install usb-modeswitch
sudo apt install python3
```

#### a. **Verificar o ModemManager**

- Para verificar se o **ModemManager** está instalado:

  ```bash
  dpkg -l | grep modemmanager
  ```

  Se o pacote estiver instalado, você verá detalhes como o nome do pacote e a versão.

- Para verificar se o serviço está ativo:

  ```bash
  sudo systemctl status ModemManager
  ```

  Você deve ver o status como `active (running)`.

- Para listar os modems detectados:

  ```bash
  mmcli -L
  ```

  Esse comando lista os dispositivos gerenciados pelo ModemManager.

  Exemplo de saída:

  ```plaintext
  /org/freedesktop/ModemManager1/Modem/X [Telit] FN990A40
  ```

  Exiba detalhes do modem:

  ```bash
  mmcli -m X
  ```

  X é o dígito informado na listagem de modems detectados. Substitua o valor correto.

---

#### b. **Verificar o Minicom**

- Para verificar se o **minicom** está instalado:

  ```bash
  dpkg -l | grep minicom
  ```

- Para testar o **minicom**, você pode abrir o programa sem conectar a uma porta serial:

  ```bash
  minicom -s
  ```

  Isso abrirá o menu de configuração do Minicom. Se ele abrir corretamente, o programa está funcionando.

---

#### c. **Verificar o Screen**

- Para verificar se o **screen** está instalado:

  ```bash
  dpkg -l | grep screen
  ```

- Para testar o **screen**, você pode iniciar uma sessão de teste (pressione `Ctrl+A` seguido de `K` para sair da sessão):

  ```bash
  screen
  ```

---

#### d. **Verificar o usb-modeswitch**

- Para verificar se o **usb-modeswitch** está instalado:

  ```bash
  dpkg -l | grep usb-modeswitch
  ```

- Para testar o funcionamento do **usb-modeswitch**, conecte o dispositivo e use o seguinte comando para alternar o modo USB, se necessário:

  ```bash
  usb_modeswitch --help
  ```

  Esse comando exibirá as opções disponíveis do programa. Para verificar se o dispositivo mudou de modo, use:

  ```bash
  lsusb
  ```

---

#### e. **Verificar o Python3**

- Para verificar se o Python3 está instalado e sua versão:

  ```bash
  python3 --version
  ```

  O comando deve retornar algo como `Python 3.11.7`.

- Para verificar se os módulos necessários estão disponíveis:

  ```bash
  python3 -m pip list
  ```

  Isso lista os pacotes instalados no ambiente Python global ou virtual. Se precisar de um pacote específico (por exemplo, `pyserial`), instale com:

  ```bash
  pip install pyserial
  ```

#### **f. Identificação do Módulo**

Após conectar o módulo, verifique se foi detectado:

```bash
lsusb
```

Exemplo de saída esperada:

```plaintext
Bus 001 Device 005: ID 1bc7:1070 Telit Wireless Solutions FN990
```

Liste as portas seriais criadas:

```bash
dmesg | grep tty
```

Exemplo de saída:

```plaintext
usb 1-5: GSM modem (1-port) converter now attached to ttyUSB0
usb 1-5: GSM modem (1-port) converter now attached to ttyUSB1
usb 1-5: GSM modem (1-port) converter now attached to ttyUSB2
```

---

Esses comandos garantem que os pacotes estão instalados e funcionando corretamente no seu sistema. Caso algum deles não esteja funcionando, você pode reinstalá-lo com `sudo apt install <pacote>`.

---

### 3. **Conexão Física**

1. **Monte o Telit EVB 2.0**:
   - Insira o módulo Telit no slot apropriado da EVB.
   - Conecte as antenas celulares e GNSS.
   - Ligue a fonte de alimentação de 12V.

2. **Conecte via USB**:
   - Use o cabo USB fornecido para conectar o EVB ao computador. Certifique-se de que o cabo esteja em bom estado para garantir comunicação adequada.

---

### 4. **Detecte o Dispositivo**

Após conectar o dispositivo, use o comando `lsusb` para verificar se o EVB foi detectado:

```bash
lsusb
```

Você deve ver uma entrada relacionada ao módulo Telit. Para listar as portas seriais atribuídas ao dispositivo, use:

```bash
dmesg | grep tty
```

Normalmente, o sistema criará dispositivos como `/dev/ttyUSB0`, `/dev/ttyUSB1`, etc.

---

### 5. **Configuração do ModemManager**

O **ModemManager** é usado para gerenciar modems no Linux e suporta dispositivos Telit.

1. **Inicie o ModemManager**:

   ```bash
   sudo systemctl start ModemManager
   sudo systemctl enable ModemManager
   ```

2. **Liste os Modems Detectados**:

   ```bash
   mmcli -L
   ```

   Isso deve exibir o módulo Telit detectado com um número de índice (por exemplo, `/org/freedesktop/ModemManager1/Modem/0`).

3. **Teste o Modem**:

   Verifique o status básico do modem:

   ```bash
   mmcli -m 0
   ```

   Substitua `0` pelo índice do modem exibido no comando anterior.

---

### 6. **Interação com o Módulo via Comandos AT**

Se precisar enviar comandos AT diretamente, use uma ferramenta como `minicom` ou `screen`:

#### **a. Acessar o Minicom**

1. Abra o Minicom na porta correta (`ttyUSB2` para comandos AT):

   ```bash
   sudo minicom -D /dev/ttyUSB2 -b 115200
   ```

2. Teste a conexão digitando:

   ```plaintext
   AT
   ```

   - Resposta esperada: `OK`.

#### **b. Configuração Básica com Comandos AT**

- Verificar o SIM card:

  ```plaintext
  AT+CPIN?
  ```

- Checar a qualidade do sinal:

  ```plaintext
  AT+CSQ
  ```

- Listar redes disponíveis:

  ```plaintext
  AT+COPS?
  ```

- Configurar o APN:

  ```plaintext
  AT+CGDCONT=1,"IP","zap.vivo.com.br"
  ```

- Ativar a conexão de dados:

  ```plaintext
  AT+CGACT=1,1
  ```

- Obter endereço IP:

  ```plaintext
  AT+CGPADDR=1
  ```

#### **c. Sair do Minicom**

Pressione:

```plaintext
Ctrl+A, depois X
```

---

### 7. **Configuração de Rede (se necessário)**

Se quiser usar o módulo para acessar a internet:

#### **a. De Maneira Geral**

1. **Configure a Conexão com o NetworkManager**:

   Liste os dispositivos detectados:

   ```bash
   nmcli device
   ```

   Configure uma conexão móvel com o APN do seu provedor:

   ```bash
   nmcli connection add type gsm ifname cdc-wdm0 con-name "Telit-5G" apn <seu_apn>
   ```

   Substitua `<seu_apn>` pelo APN do seu provedor.

2. **Ative a Conexão**:

   ```bash
   nmcli connection up "Telit-5G"
   ```

#### **b. Forçar Operação em 5G**

1. Configure o módulo para operar apenas em 5G:

   ```plaintext
   AT+QCFG="nwscanmode",5
   ```

2. Verifique o registro na rede:

   ```plaintext
   AT+CEREG?
   ```

---

#### **c. Teste da Conexão utilizando o sistema da Amarisoft Ultimate**

1. Configure o APN no sistema usando o `nmcli`:

   ```bash
   sudo nmcli connection add type gsm ifname ttyUSB2 con-name "internet" apn "internet"
   sudo nmcli connection up "internet"
   ```

2. Teste o ping para confirmar a conectividade:

   ```bash
   ping -c 4 google.com
   ```

---

### 8. **Automatize com Scripts Python**

Se precisar de maior controle sobre o dispositivo, você pode usar scripts Python para interagir com o módulo via porta serial. Aqui está um exemplo básico:

```python
import serial

port = '/dev/ttyUSB0'  # Substitua pelo dispositivo correto
baudrate = 115200

with serial.Serial(port, baudrate, timeout=1) as ser:
    ser.write(b'AT\r')
    response = ser.read(100)
    print(response.decode('utf-8'))
```

Salve esse código como `test_modem.py` e execute:

```bash
python3 test_modem.py
```

---

### 9. **Resumo dos Principais Comandos**

- Consulte o **manual do Telit EVB 2.0** para mais comandos AT e funcionalidades avançadas.
- Explore ferramentas como o **mbimcli** para interagir com dispositivos MBIM, caso o Telit suporte essa interface.

---

#### **a. Teste de Conexão**

Comando:

```plaintext
AT
```

Saída esperada:

```plaintext
OK
```

---

#### **b. Verificar o Status do SIM Card**

Comando:

```plaintext
AT+CPIN?
```

Saídas possíveis:

```plaintext
+CPIN: READY
OK
```

- Indica que o SIM está ativo e pronto.

```plaintext
+CPIN: SIM PIN
OK
```

- O SIM está bloqueado por PIN. Insira o PIN com:

  ```plaintext
  AT+CPIN="1234"
  ```

---

#### **c. Verificar a Qualidade do Sinal**

Comando:

```plaintext
AT+CSQ
```

Saída típica:

```plaintext
+CSQ: 20,0
OK
```

- **20**: Representa a força do sinal (0-31). Valores acima de 15 são bons.
- **0**: Taxa de erro (idealmente 0).

---

#### **d. Listar Redes Disponíveis**

Comando:

```plaintext
AT+COPS?
```

Saída típica:

```plaintext
+COPS: 0,0,"VIVO",7
OK
```

- **"VIVO"**: Operadora conectada.
- **7**: Tipo de rede (7 para LTE, 9 para 5G).

---

#### **e. Configurar o APN**

Comando:

```plaintext
AT+CGDCONT=1,"IP","zap.vivo.com.br"
```

Saída esperada:

```plaintext
OK
```

---

#### **f. Ativar o Contexto de Dados**

Comando:

```plaintext
AT+CGACT=1,1
```

Saída esperada:

```plaintext
OK
```

---

#### **g. Obter o Endereço IP**

Comando:

```plaintext
AT+CGPADDR=1
```

Saída típica:

```plaintext
+CGPADDR: 1,10.128.55.76
OK
```

- **10.128.55.76**: Endereço IP obtido.

---

#### **h. Verificar Registro na Rede**

Comando:

```plaintext
AT+CEREG?
```

Saídas possíveis:

```plaintext
+CEREG: 0,1
OK
```

- **1**: Registrado na rede (modo doméstico).

```plaintext
+CEREG: 0,5
OK
```

- **5**: Registrado em roaming.

```plaintext
+CEREG: 0,0
OK
```

- **0**: Não registrado.

---

#### **i. Forçar Operação em 5G**

Comando:

```plaintext
AT+QCFG="nwscanmode",5
```

Saída esperada:

```plaintext
OK
```

#### **j. Listar Modems**

Comando:

```bash
mmcli -L
```

Saída típica:

```plaintext
/org/freedesktop/ModemManager1/Modem/0 [Telit] FN990A40
```

---

#### **k. Exibir Detalhes do Modem**

Comando:

```bash
mmcli -m 0
```

Saída típica:

```plaintext
  ----------------------------------
  General  |              device id: 04be11f6f30c6d27969ca572556f707c13b8158b
  ----------------------------------
  Hardware |           manufacturer: Telit
           |                  model: FN990A40
           |      firmware revision: M0R.010002
           |           supported: gsm-umts, lte, 5gnr
           |                current: gsm-umts, lte, 5gnr
  ----------------------------------
  Status   |            power state: on
           |            access tech: lte
           |         signal quality: 73% (recent)
  ----------------------------------
  Modes    |              supported: 3g, 4g, 5g
           |                current: 4g, 5g; preferred: 5g
  ----------------------------------
  Bands    |              supported: eutran-1, eutran-3, eutran-7, ngran-78
           |                current: eutran-1, eutran-7
  ----------------------------------
  IP       |              supported: ipv4, ipv6, ipv4v6
```

---

#### **l. Verificar o Estado da Conexão**

Comando:

```bash
mmcli -m 0 --simple-status
```

Saída típica:

```plaintext
status: connected
signal: 73%
access: lte
```

#### **m. Configurar a Conexão**

Comando:

```bash
nmcli connection add type gsm ifname ttyUSB2 con-name "Telit" apn zap.vivo.com.br
```

Saída esperada:

```plaintext
Connection 'Telit' (xxxxx-xxxx-xxxxx) successfully added.
```

---

#### **n. Ativar a Conexão**

Comando:

```bash
nmcli connection up "Telit"
```

Saída esperada:

```plaintext
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/1).
```

---

#### **o. Testar Conectividade**

Comando:

```bash
ping -c 4 google.com
```

Saída típica:

```plaintext
PING google.com (172.217.28.174) 56(84) bytes of data.
64 bytes from iad23s63-in-f14.1e100.net (172.217.28.174): icmp_seq=1 ttl=116 time=18.2 ms
64 bytes from iad23s63-in-f14.1e100.net (172.217.28.174): icmp_seq=2 ttl=116 time=17.9 ms
64 bytes from iad23s63-in-f14.1e100.net (172.217.28.174): icmp_seq=3 ttl=116 time=18.1 ms
64 bytes from iad23s63-in-f14.1e100.net (172.217.28.174): icmp_seq=4 ttl=116 time=17.8 ms
```
