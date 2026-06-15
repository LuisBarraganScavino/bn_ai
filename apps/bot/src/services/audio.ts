import { Context } from 'telegraf';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '');

export async function processVoiceMessage(ctx: Context, fileId: string): Promise<string> {
  try {
    // 1. Validar el tamaño del archivo para evitar ataques DoS (Límite: 10MB)
    const fileInfo = await ctx.telegram.getFile(fileId);
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (fileInfo.file_size && fileInfo.file_size > MAX_FILE_SIZE) {
      throw new Error('El archivo de audio es demasiado grande. El límite de procesamiento es de 10MB.');
    }
    
    // 2. Obtener enlace de Telegram
    const fileLink = await ctx.telegram.getFileLink(fileId);
    
    // 3. Descargar el buffer del archivo
    const response = await axios({
      method: 'GET',
      url: fileLink.href,
      responseType: 'arraybuffer',
    });
    
    const buffer = Buffer.from(response.data);
    const base64Audio = buffer.toString('base64');

    // 3. Transcribe with Gemini 2.5 Flash native audio capabilities
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent([
      "Transcribe este audio al español con la mayor precisión posible. Responde únicamente con la transcripción directa, sin agregar comillas ni comentarios.",
      {
        inlineData: {
          mimeType: 'audio/ogg',
          data: base64Audio
        }
      }
    ]);

    return result.response.text();
  } catch (error) {
    console.error('Error processing voice message:', error);
    throw new Error('No pudimos procesar tu audio.');
  }
}
