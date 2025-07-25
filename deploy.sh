#!/bin/bash

set -e

echo "🚀 Начинаем деплой neuroalto-front..."

if [ ! -f "nginx/ssl/neuroflow.kz.crt" ] || [ ! -f "nginx/ssl/neuroflow.kz.key" ]; then
    echo "⚠️  SSL сертификаты не найдены в nginx/ssl/"
    echo "Создайте сертификаты или используйте Let's Encrypt:"
    echo "certbot certonly --standalone -d neuroflow.kz -d www.neuroflow.kz"
    echo "Затем скопируйте сертификаты в nginx/ssl/"
    exit 1
fi

echo "📦 Собираем проект..."
npm run build

echo "🛑 Останавливаем старые контейнеры..."
docker compose down || true

echo "🔄 Запускаем новые контейнеры..."
docker compose up -d

echo "✅ Проверяем статус..."
sleep 5
docker compose ps

echo "🔍 Проверяем доступность сайта..."
if curl -f -s http://localhost/health > /dev/null; then
    echo "✅ Сайт успешно развернут и доступен!"
    echo "🌐 Доступен по адресу: https://neuroflow.kz"
else
    echo "❌ Ошибка: сайт недоступен"
    echo "Проверьте логи: docker compose logs"
    exit 1
fi