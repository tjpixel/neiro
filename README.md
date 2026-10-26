# Neiro

Versión web de pruebas de **Neiro**, la app de canto hermana de [Tsuyo](https://github.com/tjpixel/tsuyo). Sale de NEXA Voz y sirve para probar y depurar el funcionamiento antes de programar la app nativa de iPhone.

- `index.html`: estructura y estilos (mismo sistema de diseño que Tsuyo)
- `core.js`: lógica: notas, catálogo de ejercicios, plan de práctica y constancia
- `audio.js`: piano de referencia, patrones que suben solos, grabadora y afinador
- `escalera.js`: guía del piano (escalera vertical o teclado horizontal), al compás de lo que suena; con «Tu voz» encendido, dibuja encima lo que cantas
- `data.js`: datos en el móvil (localStorage) y grabaciones (IndexedDB)
- `app.js`: pantallas
- `deshi.js`: Deshi, compartido con Tsuyo
- `IOS.md`: qué será nativo en la app de iPhone

Importa copias de NEXA Voz (con audios). Plus está simulado: se activa y desactiva desde la app, sin cobro.
