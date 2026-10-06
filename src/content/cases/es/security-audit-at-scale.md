---
title: "Auditoría de seguridad sobre ~1.000 repositorios, 100% local"
summary: "Había que buscar vulnerabilidades y secretos expuestos en todo el código de la organización: no solo el código fuente, también scripts, configuración y documentación."
date: 2026-09-25
tags: ["DevSecOps", "Semgrep", "gitleaks", "Python"]
draft: false
---

## Contexto

Alrededor de mil repositorios Git, uno por aplicación, en decenas de lenguajes y frameworks. Ya existía un SonarQube Community, pero solo analizaba el directorio de código fuente.

## Síntoma

Hacía falta un panorama completo y priorizable para los equipos de desarrollo, sin depender de servicios externos y sin exponer los secretos encontrados.

## Diagnóstico

1. SonarQube Community no detecta secretos en archivos sin lenguaje asignado (.env, .sh, .md) y no tiene análisis de flujo (taint).
2. Una corrida masiva contra la instancia existente la tiró por falta de recursos: el scanner necesita el servidor para bajar reglas y guardar resultados.
3. Elegí Semgrep CE, que corre 100% local, con más de 1.100 reglas de seguridad descargadas una sola vez y telemetría apagada, más gitleaks para secretos en archivos e historial.

## Causa raíz

La herramienta existente no cubría el alcance pedido (todo el repositorio) y no escalaba a una corrida masiva.

## Solución

1. Scripts en Python que clonan cada repo, corren Semgrep y gitleaks, y son reanudables (resultados en JSONL) para sobrevivir a timeouts.
2. Un reporte que unifica ambas herramientas en un mismo esquema: hallazgos, resumen por proyecto y por archivo, marcando los archivos que detectan las dos.
3. Los valores de los secretos nunca se escriben en el reporte: solo la ubicación y el tipo.
4. Priorización por severidad y confianza, filtrando código de terceros vendorizado.

## Aprendizajes

- Elegir la herramienta según el alcance real (todo el repo e historial), no según lo que ya está instalado.
- En escaneos masivos, la reanudabilidad importa tanto como las reglas.
- Un reporte de seguridad no debe convertirse en una nueva filtración.
