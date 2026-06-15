import { IntentType } from '@credinacion/core-models';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export async function routeIntent(text: string): Promise<IntentType> {
  const llm = new ChatGoogleGenerativeAI({
    modelName: 'gemini-2.5-flash',
    temperature: 0,
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
  });

  const prompt = `
  Eres el clasificador de intenciones del Banco de la Nación para adultos mayores.
  Clasifica el siguiente mensaje en una de estas categorías:
  - FAQ (Preguntas sobre cronogramas, agencias, horarios)
  - TRANSACTION_WITHDRAWAL (Retirar dinero, consultar saldo para retiro)
  - TRANSACTION_LOAN (Préstamos, pedir dinero prestado)
  - UNKNOWN (Cualquier otra cosa)
  
  Mensaje: "${text}"
  
  Responde ÚNICAMENTE con el nombre de la categoría (FAQ, TRANSACTION_WITHDRAWAL, TRANSACTION_LOAN, o UNKNOWN).
  `;

  const response = await llm.invoke(prompt);
  // Limpieza estricta: eliminamos puntos, comillas, saltos de línea y pasamos a mayúsculas
  const resultText = response.content.toString()
    .trim()
    .toUpperCase()
    .replace(/[^A-Z_]/g, ''); // Deja solo letras y guiones bajos

  if (Object.values(IntentType).includes(resultText as IntentType)) {
    return resultText as IntentType;
  }

  return IntentType.UNKNOWN;
}

