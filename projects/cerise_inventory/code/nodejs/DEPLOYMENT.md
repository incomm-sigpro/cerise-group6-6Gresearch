# Guia de Deployment - Cerise Inventory Backend

Este documento sugere uma abordagem DevOps para deploy do backend Node.js do Cerise Inventory.

## 🚀 Abordagem Recomendada

### 1. Docker
- Utilize o `Dockerfile` e `docker-compose.yml` já presentes no projeto.
- O banco de dados MySQL também roda em container.

### 2. Variáveis de Ambiente
- Use arquivos `.env` para segredos e configurações.
- Nunca commite `.env` no repositório.

### 3. CI/CD (Exemplo: GitHub Actions)
- Configure pipeline para:
  - Rodar testes automatizados
  - Build da imagem Docker
  - Deploy automático (ex: para VPS, AWS, Azure, GCP ou DigitalOcean)

#### Exemplo de workflow `.github/workflows/deploy.yml`:
```yaml
name: Deploy Backend
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run test
      - run: docker build -t cerise-backend .
      - name: Deploy to server
        run: |
          # Exemplo: docker save, scp, ssh, etc.
          echo "Customize este passo para seu ambiente"
```

### 4. Monitoramento e Logs
- Use ferramentas como PM2, LogDNA, Datadog, Grafana, Prometheus, etc.
- Configure alertas para falhas e uso de recursos.

### 5. Backup
- Programe backups automáticos do banco MySQL (ex: via cron + mysqldump).

### 6. Segurança
- Use HTTPS (proxy reverso: Nginx, Traefik, Caddy)
- Atualize dependências regularmente
- Use variáveis de ambiente seguras

---
**Cerise Inventory** - Backend pronto para produção com práticas DevOps.
