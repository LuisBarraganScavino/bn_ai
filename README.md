# 👴👵 CrediNación - Banco de la Nación (V2)

**CrediNación** es una plataforma accesible diseñada específicamente para adultos mayores en el Perú. Permite realizar consultas financieras, entender cronogramas de pago, conocer requisitos de jubilación/ONP y simular trámites de manera extremadamente sencilla, guiada por voz y con protección contra toques accidentales.

---

## 🚀 Flujo "Top" de la Arquitectura (End-to-End)

El sistema conecta de manera fluida la mensajería instantánea accesible con interfaces web adaptadas:

```text
  🎙️ Adulto Mayor               🤖 Bot de Telegram              🧠 IA (Gemini 2.5)
┌─────────────────┐           ┌─────────────────┐             ┌─────────────────────┐
│  Envía audio o  │ ────────> │ Recibe audio e  │ ──────────> │ Transcribe audio    │
│  mensaje corto  │ <──────── │ interactúa      │ <────────── │ nativamente y       │
└─────────────────┘           └────────┬────────┘             │ clasifica intención │
                                       │                      └─────────────────────┘
                                       │ (Redirección Segura)
                                       ▼
                              🌐 Web App Accesible
                        ┌───────────────────────────────┐
                        │ • Síntesis de voz (es-PE)     │
                        │ • DoubleTouchButton (Evita    │
                        │   clics accidentales)         │
                        │ • Guías paso a paso guiadas   │
                        └───────────────────────────────┘
```

### Detalle del Flujo Paso a Paso:
1. **Interacción Inicial (Telegram Bot):** El adulto mayor abre el canal oficial en Telegram `@CrediNacion_bot` e inicia la conversación ejecutando el comando `/start`. El bot responde de inmediato presentando un mensaje de bienvenida claro y un menú de botones gigantes predefinidos. A partir de ahí, el usuario puede interactuar tocando los botones, escribiendo texto o simplemente presionando el botón de micrófono para **enviar una nota de voz corta**.
2. **Procesamiento de Voz Nativo (Gemini 2.5 Flash):**
   - El audio `.ogg` es extraído y enviado directamente en formato Base64 a **Gemini 2.5 Flash**, aprovechando sus capacidades multimodales de transcripción directa de audio al español con precisión impecable.
3. **Clasificación Inteligente de Intenciones (LangChain + Gemini):**
   - El texto transcrito es procesado por un clasificador semántico basado en **LangChain**.
   - Clasifica la intención del usuario en categorías clave:
     - `FAQ`: Consultas de horarios, agencias, cronogramas de pago.
     - `TRANSACTION_WITHDRAWAL`: Retiros de ONP / pensiones.
     - `TRANSACTION_LOAN`: Consultas sobre Préstamos MultiRed.
4. **Deep Linking y Redirección Segura:** El bot le responde al usuario con un mensaje de voz/texto claro y un enlace directo (Deep Link) hacia la Web App.
5. **Experiencia Web Ultra-Accesible:**
   - **DoubleTouchButton:** Para evitar la frustración de clics accidentales por temblor o baja visión, los botones clave requieren doble toque. El primer toque reproduce por síntesis de voz la descripción detallada de lo que hace el botón. El segundo toque ejecuta la acción.
   - **Guía Asistida por Voz paso a paso:** Al entrar a la guía (`/tramite/onp` o `/tramite/prestamo`), la Web App le lee pausadamente en español peruano (`es-PE`, rate `0.9`) cada instrucción. Los usuarios pueden repetir el audio del paso actual en cualquier momento.

---

## 🛠️ Estructura del Proyecto (Monorepo)

Este proyecto está configurado como un monorepo usando `pnpm workspaces` para garantizar modularidad y reutilización máxima de código:

```text
├── apps/
│   ├── bot/                 # Bot de Telegram construido con Telegraf y Gemini SDK
│   └── web/                 # Web App de Next.js adaptada con Tailwind CSS y Speech Synthesis
├── packages/
│   ├── ai-agents/           # Agentes de IA y Enrutador de Intenciones (LangChain + Gemini)
│   └── core-models/         # Esquemas de datos comunes, tipos y validación con Zod
├── package.json             # Configuración del monorepo
└── pnpm-workspace.yaml      # Espacios de trabajo de PNPM
```

---

## ⚙️ Configuración y Despliegue Local

### Requisitos Previos
- **Node.js** v18+ y **pnpm** instalados.
- Un token de bot de Telegram obtenido a través de [@BotFather](https://t.me/BotFather).
- Una API Key de **Google Gemini** ([Google AI Studio](https://aistudio.google.com/)).

### Pasos para iniciar el proyecto:

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar Variables de Entorno:**
   Crea un archivo `.env` en `apps/bot/.env` guiándote del archivo `.env.example`:
   ```env
   TELEGRAM_BOT_TOKEN=tu_token_de_telegram
   GEMINI_API_KEY=tu_api_key_de_gemini
   WEB_APP_URL=http://localhost:3000
   ```

3. **Iniciar el Entorno de Desarrollo (Bot + Web App en paralelo):**
   ```bash
   pnpm dev
   ```

4. **Probar el Bot:**
   Abre Telegram, busca tu bot, dale a `/start` y ¡comienza a hablarle!

---

## 🛡️ Seguridad y Buenas Prácticas (Hardening P0)
- **Validación Estricta:** Uso de **Zod** en el paquete `core-models` para validar payloads entrantes de enrutamiento y deep links.
- **Protección DoS:** El bot de Telegram valida el tamaño de los audios entrantes limitándolos a un máximo de `10MB` antes de su procesamiento.
- **Sanitización Estricta:** La respuesta del clasificador de intenciones pasa por una limpieza estricta regex para evitar inyecciones o salidas mal formateadas de la IA.
- **Entorno Seguro:** Conexión segura HTTPS y uso del SDK oficial de Google Generative AI para transacciones encriptadas.
