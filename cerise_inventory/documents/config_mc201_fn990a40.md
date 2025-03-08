# Configurando o Techship MC201 Adapter junto com o Telit FN990A40 5G sub6 M.2

## Passo 1: Preparação e Conexão Física dos Dispositivos

1. **Instale o Módulo M.2**: Insira o módulo Telit FN990A40 5G sub6 M.2 no slot M.2 do Techship MC201 Adapter. Certifique-se de que está corretamente encaixado e fixo.

2. **Conecte o Adaptador ao PC via USB-C**:
   - O Techship MC201 Adapter deve possuir uma porta USB-C para facilitar a conexão com o computador.
   - Use um cabo USB-C para conectar o adaptador ao seu computador com Pop!_OS.

3. **Verifique a Conexão USB-C**:
   - Após conectar, verifique se o dispositivo foi reconhecido. No terminal, execute o seguinte comando para listar dispositivos USB:

     ```bash
     lsusb
     ```

   - Procure por uma entrada que corresponda ao Techship MC201 Adapter ou ao módulo Telit FN990A40. Isso confirma que o dispositivo está sendo reconhecido pelo sistema.

## Passo 2: Instale os Drivers Necessários

Pop!_OS geralmente inclui drivers para muitos dispositivos, mas para módulos de comunicação 5G específicos, você pode precisar instalar pacotes adicionais.

1. **Instale o `usb-modeswitch`**:
   - Alguns dispositivos M.2 podem precisar que o modo de funcionamento seja alternado. O `usb-modeswitch` ajuda com isso:

     ```bash
     sudo apt install usb-modeswitch
     ```

2. **Instale o ModemManager**:
   - O **ModemManager** é uma ferramenta para gerenciar dispositivos de banda larga móvel (4G/5G) no Linux. Instale-o com:

     ```bash
     sudo apt install modemmanager
     ```

3. **Verifique o Status do ModemManager**:
   - Após a instalação, verifique se o ModemManager está em execução:

     ```bash
     sudo systemctl start ModemManager
     sudo systemctl enable ModemManager
     ```

   - Você também pode verificar o status para garantir que ele reconheceu o dispositivo:

     ```bash
     mmcli -L
     ```

   - Isso listará todos os dispositivos de modem conectados. Você deve ver o Telit FN990A40 listado aqui.

## Passo 3: Configuração de Rede e Testes

1. **Configure a Conexão de Rede com o `nmcli`**:
   - Use o `nmcli`, uma ferramenta de linha de comando para configurar redes. Primeiro, liste os dispositivos de modem detectados:

     ```bash
     nmcli device
     ```

   - Identifique o nome do dispositivo do adaptador (por exemplo, `cdc-wdm0` ou similar).

2. **Estabeleça uma Conexão de Dados Móveis**:
   - Configure uma nova conexão para o dispositivo de banda larga móvel:

     ```bash
     nmcli connection add type gsm ifname <nome_do_dispositivo> con-name "5G-Connection" apn <seu_apn>
     ```

     Substitua `<nome_do_dispositivo>` pelo nome real do dispositivo identificado no comando anterior e `<seu_apn>` pelo APN do provedor de rede.

3. **Ative a Conexão**:

   ```bash
   nmcli connection up "5G-Connection"
   ```

   Isso deve iniciar uma conexão de dados 5G. Verifique o status com:

   ```bash
   nmcli connection show --active
   ```

## Passo 4: Teste a Conexão

Para verificar se a conexão está ativa e funcional:

1. **Verifique o Status da Rede**:

   ```bash
   mmcli -m 0
   ```

   Esse comando fornecerá informações detalhadas sobre a conexão e o estado do dispositivo.

2. **Teste a Conectividade**:

   Use o comando `ping` para verificar se a conexão está ativa:

   ```bash
   ping -c 4 google.com
   ```
