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

// Menú Principal
const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('👴 Guía de Pensión (ONP)', 'ACTION_A')],
  [Markup.button.callback('💳 Info Préstamos MultiRed', 'ACTION_B')],
  [Markup.button.callback('📅 Cronograma de Pagos', 'ACTION_C')],
  [Markup.button.callback('🤝 Ayudas Sociales y Bonos', 'ACTION_D')]
]);

// Sub-Menús con opciones oficiales reales de Perú
const pensionSubMenu = Markup.inlineKeyboard([
  [Markup.button.callback('👴 Guía de Pensión (ONP)', 'SUB_ACTION_PENSION_ONP')],
  [Markup.button.callback('👵 Pensión de Viudez - ONP', 'SUB_ACTION_PENSION_VIUDEZ')],
  [Markup.button.callback('⬅️ Volver al Menú Principal', 'BACK_TO_MAIN')]
]);

const prestamoSubMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💳 Préstamo de Descuento Directo', 'SUB_ACTION_PRESTAMO_DIRECTO')],
  [Markup.button.callback('👴💳 Préstamo Especial para Jubilados', 'SUB_ACTION_PRESTAMO_JUBILADOS')],
  [Markup.button.callback('⬅️ Volver al Menú Principal', 'BACK_TO_MAIN')]
]);

const cronogramaSubMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📅 Cronograma de Pensionistas ONP', 'SUB_ACTION_CRONO_ONP')],
  [Markup.button.callback('🏢 Pagos Sector Público (Ley 19990)', 'SUB_ACTION_CRONO_PUBLICO')],
  [Markup.button.callback('⬅️ Volver al Menú Principal', 'BACK_TO_MAIN')]
]);

const bonosSubMenu = Markup.inlineKeyboard([
  [Markup.button.callback('🔍 Consulta de Devolución Fonavi', 'SUB_ACTION_BONO_FONAVI')],
  [Markup.button.callback('☀️ Programa Nacional Pensión 65', 'SUB_ACTION_BONO_PENSION65')],
  [Markup.button.callback('⬅️ Volver al Menú Principal', 'BACK_TO_MAIN')]
]);

// Menú de Interconexión y Feedback
const feedbackMenu = (originCase: string) => Markup.inlineKeyboard([
  [Markup.button.callback('✅ Sí, todo claro', 'FEEDBACK_YES')],
  [Markup.button.callback('❓ Necesito más información', `FEEDBACK_MORE_${originCase}`)]
]);

const morePensionMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📅 Ver Cronogramas', 'ACTION_C')],
  [Markup.button.callback('💳 Ver Préstamos MultiRed', 'ACTION_B')],
  [Markup.button.callback('⬅️ Ir al Menú Principal', 'BACK_TO_MAIN')]
]);

const morePrestamoMenu = Markup.inlineKeyboard([
  [Markup.button.callback('👴 Ver Pensión ONP', 'ACTION_A')],
  [Markup.button.callback('📅 Ver Cronogramas', 'ACTION_C')],
  [Markup.button.callback('⬅️ Ir al Menú Principal', 'BACK_TO_MAIN')]
]);

const moreCronoMenu = Markup.inlineKeyboard([
  [Markup.button.callback('🤝 Ver Ayudas y Bonos', 'ACTION_D')],
  [Markup.button.callback('👴 Ver Pensión ONP', 'ACTION_A')],
  [Markup.button.callback('⬅️ Ir al Menú Principal', 'BACK_TO_MAIN')]
]);

const moreBonosMenu = Markup.inlineKeyboard([
  [Markup.button.callback('☀️ Ver Pensión 65', 'SUB_ACTION_BONO_PENSION65')],
  [Markup.button.callback('📅 Ver Cronogramas', 'ACTION_C')],
  [Markup.button.callback('⬅️ Ir al Menú Principal', 'BACK_TO_MAIN')]
]);

bot.start(async (ctx) => {
  await ctx.reply(welcomeMessage, mainMenu);
});

// Manejo de botones de primer nivel (Menú Principal)
bot.action('ACTION_A', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Excelente elección. Contamos con las siguientes opciones oficiales en el Perú para tu Pensión/ONP en el Banco de la Nación. ¿Cuál deseas consultar hoy? 👇', pensionSubMenu);
});

bot.action('ACTION_B', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Perfecto. Contamos con préstamos preferenciales con descuento directo para trabajadores y jubilados del sector público. ¿Cuál deseas consultar hoy? 👇', prestamoSubMenu);
});

bot.action('ACTION_C', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Aquí puedes consultar las fechas oficiales de pago programadas para este mes de forma digital. Selecciona tu tipo de pensión o sector público: 👇', cronogramaSubMenu);
});

bot.action('ACTION_D', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Conoce los apoyos económicos del Estado que se gestionan y cobran de forma segura a través del Banco de la Nación: 👇', bonosSubMenu);
});

// Manejo de botones de segundo nivel (Sub-Menús oficiales)
bot.action('SUB_ACTION_PENSION_ONP', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para guiarte paso a paso sobre cómo revisar o cobrar tu Pensión/ONP por internet, ingresa a este enlace seguro con voz:\n👉 ${baseUrl}/tramite/onp`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('PENSION'));
  }, 1500);
});

bot.action('SUB_ACTION_PENSION_VIUDEZ', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Excelente! Para guiarte paso a paso en el trámite de tu Pensión de Viudez de forma digital, ingresa a este enlace seguro con voz:\n👉 ${baseUrl}/tramite/viudez`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('PENSION'));
  }, 1500);
});

bot.action('SUB_ACTION_PRESTAMO_DIRECTO', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para conocer los requisitos del Préstamo de Descuento Directo, ingresa a nuestra guía interactiva con voz:\n👉 ${baseUrl}/tramite/prestamo`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('PRESTAMO'));
  }, 1500);
});

bot.action('SUB_ACTION_PRESTAMO_JUBILADOS', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Excelente! Para conocer las facilidades del Préstamo Especial para Jubilados, ingresa aquí a nuestra guía interactiva con voz:\n👉 ${baseUrl}/tramite/jubilado-prestamo`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('PRESTAMO'));
  }, 1500);
});

bot.action('SUB_ACTION_CRONO_ONP', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para revisar tu fecha exacta del Cronograma de Pensionistas ONP, ingresa a este enlace seguro con voz:\n👉 ${baseUrl}/tramite/cronograma`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('CRONO'));
  }, 1500);
});

bot.action('SUB_ACTION_CRONO_PUBLICO', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Excelente! Para revisar el Cronograma de Pagos del Sector Público (Ley 19990), ingresa a este enlace seguro con voz:\n👉 ${baseUrl}/tramite/cronograma-publico`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('CRONO'));
  }, 1500);
});

bot.action('SUB_ACTION_BONO_FONAVI', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Perfecto! Para informarte de forma segura sobre la consulta de Devolución Fonavi, ingresa a este enlace con voz:\n👉 ${baseUrl}/tramite/bonos`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('BONOS'));
  }, 1500);
});

bot.action('SUB_ACTION_BONO_PENSION65', async (ctx) => {
  await ctx.answerCbQuery();
  const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
  await ctx.reply(`¡Excelente! Para informarte de forma segura sobre el Programa Nacional Pensión 65, ingresa a este enlace con voz:\n👉 ${baseUrl}/tramite/pension65`);
  setTimeout(async () => {
    await ctx.reply('¿Pudiste revisar la información o necesitas ayuda adicional? 👇', feedbackMenu('BONOS'));
  }, 1500);
});

// Manejo de Callbacks de Feedback y Navegación
bot.action('BACK_TO_MAIN', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('¡Perfecto! Regresemos al Menú Principal. Elige cualquiera de estas opciones: 👇', mainMenu);
});

bot.action('FEEDBACK_YES', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('¡Me alegro muchísimo! 😊 Recuerda que estoy aquí para ayudarte y cuidarte en todo momento. ¡Que tengas un excelente y bendecido día! 🌸');
});

bot.action('FEEDBACK_MORE_PENSION', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Te recomiendo revisar también el 📅 Cronograma de Pagos para saber cuándo cobras o conocer nuestros 💳 Préstamos MultiRed con tasas bajas de interés:', morePensionMenu);
});

bot.action('FEEDBACK_MORE_PRESTAMO', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Te recomiendo informarte sobre cómo se abona tu 👴 Pensión ONP directamente en tu cuenta de ahorros o revisar el 📅 Cronograma de Pagos:', morePrestamoMenu);
});

bot.action('FEEDBACK_MORE_CRONO', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Te recomiendo consultar las 🤝 Ayudas Sociales y Bonos del Estado vigentes o revisar los requisitos de tu 👴 Pensión ONP:', moreCronoMenu);
});

bot.action('FEEDBACK_MORE_BONOS', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Te recomiendo revisar la información oficial sobre el programa ☀️ Pensión 65 para adultos mayores o consultar el 📅 Cronograma de Pagos de este mes:', moreBonosMenu);
});

async function handleUserIntent(ctx: any, queryText: string) {
  try {
    const intent = await routeIntent(queryText);
    const baseUrl = process.env.WEB_APP_URL || 'https://credinacion.app';
    
    if (intent === 'TRANSACTION_WITHDRAWAL') {
      await ctx.reply('Excelente elección. Contamos con las siguientes opciones oficiales en el Perú para tu Pensión/ONP en el Banco de la Nación. ¿Cuál deseas consultar hoy? 👇', pensionSubMenu);
    } else if (intent === 'TRANSACTION_LOAN') {
      await ctx.reply('Perfecto. Contamos con préstamos preferenciales con descuento directo para trabajadores y jubilados del sector público. ¿Cuál deseas consultar hoy? 👇', prestamoSubMenu);
    } else if (intent === 'FAQ') {
      await ctx.reply('Aquí puedes consultar las fechas oficiales de pago programadas para este mes de forma digital. Selecciona tu tipo de pensión o sector público: 👇', cronogramaSubMenu);
    } else {
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
    if (text === 'A') {
      return await ctx.reply('Excelente elección. Contamos con las siguientes opciones oficiales en el Perú para tu Pensión/ONP en el Banco de la Nación: 👇', pensionSubMenu);
    }
    if (text === 'B') {
       return await ctx.reply('Perfecto. Contamos con préstamos preferenciales con descuento directo para trabajadores y jubilados del sector público: 👇', prestamoSubMenu);
    }
    if (text === 'C') {
       return await ctx.reply('Aquí puedes consultar las fechas oficiales de pago programadas para este mes de forma digital: 👇', cronogramaSubMenu);
    }
    if (text === 'D') {
       return await ctx.reply('Conoce los apoyos económicos del Estado que se gestionan y cobran de forma segura a través del Banco de la Nación: 👇', bonosSubMenu);
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
