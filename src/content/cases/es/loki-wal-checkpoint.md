---
title: "WAL de Loki al 100%: el problema no era el storage"
summary: "Los discos de WAL de los ingesters estaban llenos. Parecía un problema de object storage ya conocido, pero era un checkpoint trabado en un loop de disco lleno."
date: 2026-08-28
tags: ["Loki", "OpenShift Logging", "Storage", "Troubleshooting"]
draft: false
---

## Contexto

Stack de logging de OpenShift (LokiStack) con ingesters que escriben un Write-Ahead Log en volúmenes de 150 GiB antes de hacer flush a un object storage S3 compatible.

## Síntoma

Los dos ingesters estaban Ready pero con el volumen de WAL al 100%. Meses antes había pasado algo parecido por un bucket S3 lleno, así que la primera sospecha era la misma.

```plaintext
level=error caller=checkpoint.go:613 msg="error checkpointing series"
  err="write /tmp/wal/00080651: no space left on device"
```

## Diagnóstico

1. Descarté el storage: los logs mostraban flush a S3 funcionando, decenas de streams por minuto y cero errores de cuota.
2. En los logs del ingester apareció el patrón real: cada 5 minutos Loki intentaba un checkpoint y fallaba con "no space left on device".
3. Sin un checkpoint exitoso, Loki no puede truncar los segmentos viejos del WAL, así que el disco nunca se liberaba. Llevaba 4 días en ese loop.
4. Quedaba además un checkpoint interrumpido (.tmp) de más de 7 GB por ingester.

## Causa raíz

Un loop: disco lleno → checkpoint falla → no se truncan segmentos → disco sigue lleno. El object storage estaba sano.

## Solución

1. Borré el checkpoint .tmp interrumpido: nunca se usa para replay.
2. No alcanzó. df marcaba 95%, pero el proceso corre como usuario no-root y ext4 reserva ~5% para root: el espacio realmente disponible lo mostraba stat -f.
3. Borré también el checkpoint completo anterior, después de verificar que el flush a S3 seguía activo. El checkpoint es solo una optimización del replay; la fuente de verdad son los segmentos WAL.
4. El siguiente checkpoint automático completó solo y Loki truncó unos 130 segmentos viejos. El WAL pasó de 100% a 3%, sin reiniciar pods ni perder datos.

## Aprendizajes

- Un síntoma igual a un incidente anterior no significa la misma causa: hay que volver a descartar desde la evidencia.
- Para medir el espacio de un proceso no-root, usar stat -f (Available) y no solo df.
- Entender qué parte del estado es optimización y cuál es fuente de verdad permite intervenir sin downtime.
