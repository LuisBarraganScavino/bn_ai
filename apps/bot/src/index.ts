import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import { routeIntent } from '@credinacion/ai-agents';
import { processVoiceMessage } from './services/audio';

dotenv.config();

// 1. Validación de Entorno (Hardening P0)
if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('❌ CRÍTICO: Falta la variable TELEGRAM_BOT_TOKEN en el archivo .env');
}
if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
  throw new Error('❌ CRÍTICO: Falta la variable GEMINI_API_KEY o GOOGLE_API_KEY en el archivo .env');
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const welcomeMessage = '¡Hola! 👋 Soy Credi, tu asistente virtual del Banco de la Nación. ¡Qué gusto tenerte por aquí! 😊\n\nElige una de estas opciones tocando los botones 👇 o envíame un audio corto con tu consulta 🎙️';

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('👴 Guía de Pensión (ONP)', 'ACTION_A')],
  [Markup.button.callback('💳 Info Préstamos MultiRed', 'ACTION_B')],
  [Markup.button.callback('📅 Cronograma de Pagos', 'ACTION_C')],
  [Markup.button.callback('🤝 Ayudas Sociales y Bonos', 'ACTION_D')]
]);

bot.start(async (ctx) => {
  await ctx.reply(welcomeMessage, mainMenu);
});

// Manejo de botones
bot.action('ACTION_A', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para guiarte paso a paso sobre cómo revisar o tramitar tu Pensión/ONP, por favor ingresa a este enlace seguro donde te explicaré con voz: \n👉 ${baseUrl}/tramite/onp`);
});

bot.action('ACTION_B', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`Excelente. Para conocer los requisitos e iniciar la solicitud de tu Préstamo MultiRed, ingresa a nuestra guía interactiva: \n👉 ${baseUrl}/tramite/prestamo`);
});

bot.action('ACTION_C', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para revisar las fechas exactas de cobro del cronograma de este mes, ingresa a nuestro enlace seguro guiado por voz:\n👉 ${baseUrl}/tramite/cronograma`);
});

bot.action('ACTION_D', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Excelente! Para consultar los bonos activos del Estado (Fonavi, Bono Familiar) con total seguridad, ingresa aquí:\n👉 ${baseUrl}/tramite/bonos`);
});

async function handleUserIntent(ctx: any, queryText: string) {
  try {
    const intent = await routeIntent(queryText);
    const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
    
    if (intent === 'TRANSACTION_WITHDRAWAL') {
      await ctx.reply(`Parece que tienes consultas sobre tu pensión o retiro. Ingresa aquí para recibir asistencia guiada paso a paso: \n👉 ${baseUrl}/tramite/onp`);
    } else if (intent === 'TRANSACTION_LOAN') {
      await ctx.reply(`Parece que necesitas información sobre un préstamo. Ingresa a nuestra guía segura para ver los requisitos: \n👉 ${baseUrl}/tramite/prestamo`);
    } else if (intent === 'FAQ') {
      await ctx.reply(`Para revisar el cronograma de pagos, horarios y consultas generales con voz, ingresa aquí:\n👉 ${baseUrl}/tramite/cronograma`);
    } else {
      // Intención UNKNOWN: Respuesta amigable y orientadora con los botones principales
      await ctx.reply('¡Hola! Sí, te escucho fuerte y claro. 🎙️😊 Te puedo apoyar con cualquiera de las opciones de los botones de abajo 👇', mainMenu);
    }
  } catch (error) {
    console.error('Routing Error:', error);
    await ctx.reply('Disculpa, tuvimos un problema de conexión. 🔌 ¿Me lo repites de nuevo, por favor? 🙏');
  }
}

bot.on('text', async (ctx) => {
  if (!ctx.message || !('text' in ctx.message)) return;
  const rawText = ctx.message.text;
  const text = rawText.trim().toUpperCase();
  
  // Capturar saludos comunes para mostrar los botones
  if (['HOLA', 'HOLA!', 'HOLAA', 'BUENAS', 'BUENOS DIAS', 'BUENOS DÍAS', 'BUEN DÍA'].includes(text)) {
    return await ctx.reply(welcomeMessage, mainMenu);
  }

  // Handle explicit letter choices (Fallback)
  if (['A', 'B', 'C', 'D', 'E'].includes(text)) {
    const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
    if (text === 'A') {
      return await ctx.reply(`¡Perfecto! Para guiarte paso a paso sobre cómo revisar o tramitar tu Pensión/ONP, por favor ingresa a este enlace seguro donde te explicaré con voz: \n👉 ${baseUrl}/tramite/onp`);
    }
    if (text === 'B') {
       return await ctx.reply(`Excelente. Para conocer los requisitos e iniciar la solicitud de tu Préstamo MultiRed, ingresa a nuestra guía interactiva: \n👉 ${baseUrl}/tramite/prestamo`);
    }
    if (text === 'C') {
       return await ctx.reply(`¡Perfecto! Para revisar las fechas exactas de cobro del cronograma de este mes, ingresa a nuestro enlace seguro guiado por voz:\n👉 ${baseUrl}/tramite/cronograma`);
    }
    if (text === 'D') {
       return await ctx.reply(`¡Excelente! Para consultar los bonos activos del Estado (Fonavi, Bono Familiar) con total seguridad, ingresa aquí:\n👉 ${baseUrl}/tramite/bonos`);
    }
    if (text === 'E') {
       return await ctx.reply('Por favor, cuéntame en un mensaje de texto o envíame un audio corto con tu consulta.');
    }
  }

  // Fallback to AI Routing for normal text
  await ctx.reply('Procesando tu consulta...');
  await handleUserIntent(ctx, rawText);
});

bot.on('voice', async (ctx) => {
  try {
    await ctx.reply('Escuchando tu audio... 🎙️');
    const fileId = ctx.message.voice.file_id;
    const transcribedText = await processVoiceMessage(ctx, fileId);
    await ctx.reply(`Transcripción: "${transcribedText}"`);
    
    await ctx.reply('Procesando tu consulta...');
    await handleUserIntent(ctx, transcribedText);
  } catch (err) {
    await ctx.reply('Hubo un problema procesando tu audio. Por favor intenta escribiendo.');
  }
});

// Eliminar cualquier Webhook viejo fantasma de Telegram antes de iniciar localmente
bot.telegram.deleteWebhook({ drop_pending_updates: true }).then(() => {
  bot.launch({ dropPendingUpdates: true }).then(() => {
    console.log('✅ Webhook eliminado. Bot is running LOCALMENTE y escuchando mensajes nuevos...');
  });
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
