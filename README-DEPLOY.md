# Деплой на neuroflow.kz

## Быстрый старт

1. **Получите SSL сертификаты:**
   ```bash
   certbot certonly --standalone -d neuroflow.kz -d www.neuroflow.kz
   
   cp /etc/letsencrypt/live/neuroflow.kz/fullchain.pem nginx/ssl/neuroflow.kz.crt
   cp /etc/letsencrypt/live/neuroflow.kz/privkey.pem nginx/ssl/neuroflow.kz.key
   ```

2. **Запустите деплой:**
   ```bash
   ./deploy.sh
   ```

## Структура файлов

```
├── compose.yml           # Docker Compose конфигурация
├── Dockerfile           # Для сборки production образа
├── deploy.sh            # Скрипт автоматического деплоя
├── nginx/
│   ├── nginx.conf       # Конфигурация Nginx
│   ├── ssl/             # SSL сертификаты
│   └── logs/            # Логи Nginx
└── dist/                # Собранные статические файлы
```

## Команды

- `npm run build` - сборка проекта
- `docker-compose up -d` - запуск в фоне
- `docker-compose down` - остановка
- `docker-compose logs` - просмотр логов
- `./deploy.sh` - полный деплой

## Особенности конфигурации

- ✅ Автоматический редирект HTTP → HTTPS
- ✅ Современная SSL конфигурация
- ✅ Сжатие Gzip
- ✅ Кэширование статических файлов
- ✅ Security headers
- ✅ SPA routing support
- ✅ Health check endpoint

## Мониторинг

- Health check: `https://neuroflow.kz/health`
- Логи: `docker compose logs -f`
- Статус: `docker compose ps`