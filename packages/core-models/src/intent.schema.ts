import { z } from 'zod';

export enum IntentType {
  FAQ = 'FAQ',
  TRANSACTION_WITHDRAWAL = 'TRANSACTION_WITHDRAWAL',
  TRANSACTION_LOAN = 'TRANSACTION_LOAN',
  UNKNOWN = 'UNKNOWN'
}

export const AgentRoutingRequestSchema = z.object({
  userId: z.string(),
  transcribedText: z.string(),
});
export type AgentRoutingRequest = z.infer<typeof AgentRoutingRequestSchema>;

export const DeepLinkPayloadSchema = z.object({
  tokenId: z.string(),
  intent: z.nativeEnum(IntentType),
  expiresAt: z.date(),
});
export type DeepLinkPayload = z.infer<typeof DeepLinkPayloadSchema>;
