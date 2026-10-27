# Neiro en iPhone · notas para la app nativa

La web de pruebas fija el diseño, los flujos y el formato de datos. En SwiftUI cada pieza tiene su equivalente:

| Web de pruebas | App de iOS |
|---|---|
| `core.js` (catálogo, plan, constancia) | Modelo en Swift, misma lógica 1:1 |
| Datos en localStorage, formato `neiro_v1` | SwiftData en el móvil + sincronización (Supabase o CloudKit) con el mismo JSON |
| Grabaciones en IndexedDB | Archivos `.m4a` en el móvil, copia en iCloud Drive (Plus) |
| Piano de referencia (Web Audio) | AVAudioEngine con un sampler de piano real |
| Escalera y teclado del piano (`escalera.js`, SVG) | Vista de SwiftUI (Canvas) que lee el mismo plan de la vuelta (`patPlan`): lo encendido es lo que suena |
| Afinador (McLeod con FFT, media de 0,35 s en pantalla, margen por nivel, no escucha mientras suena la referencia) | AVAudioEngine + vDSP (Accelerate) para la misma detección y las mismas reglas; con auriculares podría escuchar también mientras suena el piano. Opción futura: modelo tipo CREPE en Core ML |
| «Tu voz encima» (línea naranja de lo que cantas sobre la escalera; con altavoz solo en los huecos del piano, tras comprobar con una nota si el micro lo oye) | Mismo detector en vDSP; en iOS se sabe si hay auriculares (AVAudioSession.currentRoute), así que no hace falta la nota de prueba, y con el altavoz se puede usar el modo de voz con cancelación de eco |
| Grabadora (MediaRecorder) | AVAudioRecorder, sigue grabando con la pantalla apagada |
| Temporizador de la práctica | **Actividad en vivo**: bloque y tiempo en la pantalla de bloqueo y la Dynamic Island |
| Aviso «Apunta la clase de hoy» | **Notificación** al acabar la hora de clase |
| Recordatorio de práctica | Notificación diaria en los días elegidos |
| Racha y cinturón | **Widget** de pantalla de inicio y de bloqueo |
| «Empezar» | **App Intent**: «Oye Siri, empieza a practicar canto» |
| Plus simulado | StoreKit 2: anual con 7 días gratis y mensual |

## Pendiente de decidir
- Confirmar que el nombre «Neiro» está libre (App Store y registro de marcas) antes de publicar.
- Cuentas: misma cuenta que Tsuyo («familia Tsuyo») o separada.
- Piano: sintetizado (ligero) o muestras grabadas (mejor sonido, más peso).

## Micrófono (neiro-v17)
- En la web, el micro se elige en Tú → Micrófono (`cfg.mic = {id, label}`); «Automático» deja que decida el móvil. Si el elegido no está, se usa el del móvil sin error.
- En iPhone: `AVAudioSession` con categoría `.playAndRecord` y `setPreferredInput` para el micro elegido (`availableInputs`: integrado, auriculares de cable, bluetooth HFP, USB).
- Con un micro bluetooth (HFP) los auriculares pasan a calidad de llamada también para lo que suena. Para cantar con AirPods y buena calidad: escuchar por bluetooth (A2DP, opción `.allowBluetoothA2DP`) y grabar con el micro integrado.
- Abrir el micro sin procesar (modo `.measurement`): sin cancelación de eco, reducción de ruido ni control de volumen automático, como en la web.
