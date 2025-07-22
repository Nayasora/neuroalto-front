<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Настройки</h1>
      <p class="text-muted-foreground">
        Управляйте настройками вашего аккаунта и предпочтениями
      </p>
    </div>

    <div class="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
          <CardDescription>Настройте способы получения уведомлений</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">Email уведомления</div>
                <div class="text-sm text-muted-foreground">Получать уведомления по email</div>
              </div>
              <Button variant="outline" size="sm">Настроить</Button>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">SMS уведомления</div>
                <div class="text-sm text-muted-foreground">Получать уведомления по SMS</div>
              </div>
              <Button variant="outline" size="sm">Настроить</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
          <CardDescription>Управление безопасностью аккаунта</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <Button variant="outline">Изменить пароль</Button>
            <Button variant="outline">Двухфакторная аутентификация</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>