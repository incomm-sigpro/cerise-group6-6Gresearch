# veiculo-autonomo-jammer

Projeto de construção de um protótipo de veículo autônomo com reconhecimento de objetos através de um ESP32Cam e capacidade de interferência no espectro eletromagnético (jamming).

## 💻 Sobre

O projeto está contextualizado no [CERISE](https://cerise.ufg.br/), que é o Centro de Excelência de Redes Inteligentes Sem Fio e Serviços Avançados da Universidade Federal de Goiás ([UFG](https://ufg.br/)), mais especificamente, no âmbito do Grupo 06: Pesquisa em 6G-Pesquisa. O grupo de pesquisa em 6G desenvolve simulações de sistemas 5G, aprendizado federado, beamforming inteligente, algoritmos multiagentes e cooperativos, mobilidade em redes cell-free com MIMO Massivas, superfícies refletoras inteligentes configuráveis, tecnologias 6G. Além disso, são desenvolvidos protótipos para prova de conceito e testbed de novas tecnologias.

![Banner CERISE](assets/images/banner-principal.png)

## 📊 Objetivos

O projeto visa desenvolver um sistema integrado de veículo autônomo com capacidades de:

- **Reconhecimento de Objetos**: Utilizando ESP32Cam para detecção e classificação de objetos em tempo real
- **Interferência Eletromagnética**: Implementação de diferentes técnicas de jamming usando GNU Radio e USRP X310
- **Análise de Espectro**: Monitoramento e análise de sinais em diferentes bandas de frequência
- **Pesquisa em 6G**: Contribuição para o desenvolvimento de tecnologias de comunicação de próxima geração

### Funcionalidades de Jamming Implementadas

O sistema inclui múltiplas técnicas de interferência eletromagnética:

- **Barrage Jammer**: Interferência de banda larga para cobrir múltiplas frequências simultaneamente
- **Spot Jammer**: Interferência direcionada a frequências específicas
- **Sweeping Jammer**: Interferência que varre diferentes frequências sequencialmente
- **Blackout Jammer**: Interferência para interrupção completa de comunicação
- **Spectrum Analyzer**: Análise e visualização do espectro de frequências

## 📂🛠️ Projeto de execução

O projeto de execução das atividades está organizado nas seguintes estruturas:

### Código GNU Radio (`code/gnuradio/x310/`)

- **barrage_jammer/**: Implementações de interferência de banda larga
  - `fixed_barrage_jammer.grc/.py`: Jammer de banda larga com frequência fixa
  - `freq_selector_barrage_jammer.grc/.py`: Jammer de banda larga com seletor de frequência
- **spot_jammer/**: Implementações de interferência direcionada
  - `fixed_spot_jammer.grc/.py`: Jammer direcionado com frequência fixa
  - `freq_selector_spot_jammer.grc/.py`: Jammer direcionado com seletor de frequência
- **sweeping_jammer/**: Implementação de interferência varredora
  - `sweeping_jammer.grc/.py`: Jammer que varre diferentes frequências
- **blackout_jammer/**: Implementações de interferência de interrupção
  - `fixed_blackout_jammer.grc/.py`: Jammer de interrupção com frequência fixa
  - `freq_selector_blackout_jammer.grc/.py`: Jammer de interrupção com seletor de frequência
- **spectrum_analyser/**: Análise de espectro
  - `spectrum_analyser_slider.grc`: Analisador com controle deslizante
  - `spectrum_analiser_fixed_center_frequency.grc`: Analisador com frequência central fixa

### Imagens e Resultados (`assets/gnuradio_images/`)

- Análises espectrais de diferentes configurações de jamming
- Comparações entre espectro em repouso e com interferência ativa
- Resultados de testes com diferentes larguras de banda (10MHz, 20MHz, 40MHz, 80MHz)

## 🛠 Tecnologias

Para execução do projeto, as seguintes tecnologias foram utilizadas:

### Plataformas

- [ESP32Cam](https://github.com/espressif/esp32-camera)
- [ESP32 WROOM](https://github.com/espressif/arduino-esp32)

### Hardware de RF

- **USRP X310**: Software Defined Radio (SDR) para transmissão e recepção de sinais RF
- **Antenas TX/RX**: Para transmissão e recepção de sinais

### Software de Processamento de Sinais

- **[GNU Radio](https://www.gnuradio.org/)**: Framework para desenvolvimento de aplicações de rádio definido por software
- **[UHD (USRP Hardware Driver)](https://github.com/EttusResearch/uhd)**: Driver para comunicação com USRP
- **[PyQt5](https://www.riverbankcomputing.com/software/pyqt/)**: Interface gráfica para aplicações GNU Radio

### Servidor

- [C++](https://isocpp.org/)

### Web client

- [HTML](https://www.w3schools.com/html)
- [CSS](https://www.w3schools.com/css)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Banco de Dados

- Memória Flash do dispositivo ESP32

### Machine Learning & Deep Learning

- fd_forward
- fr_forward
- fr_flash

## 📚 Documentação

### Artigos e Relatórios

- **Análise de Jamming em Bluetooth, WiFi e 5G**: Relatório técnico detalhado sobre as técnicas de interferência implementadas e seus resultados (`docs/articles/jamming_analysis_bluetooth_wifi_5g.pdf`)

### Referências Técnicas

- **Comunicações Móveis**: Documentação sobre bandas de frequência para diferentes tecnologias móveis (2G, 3G, 4G, 5G)
- **Frequências de Operação**: Referências sobre bandas UMTS, LTE e 5G NR

## Referências

- [Espressif](https://www.espressif.com/)
- [Espressif](https://www.espressif.com/en/news/ESP32_CAM)
- [Espressif](https://github.com/espressif/esp32-camera)
- [Robot Zero One](https://robotzero.one/)
- [GNU Radio](https://www.gnuradio.org/)
- [Ettus Research (USRP)](https://www.ettus.com/)
- [UHD Documentation](https://files.ettus.com/manual/)

## 📝 Licença

Este projeto está sob a licença MIT.

___

Feito com 💜 by CERISE - 6G
