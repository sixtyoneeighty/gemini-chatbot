ALTER TABLE "Chat" 
ADD COLUMN IF NOT EXISTS "toolCalls" jsonb,
ADD COLUMN IF NOT EXISTS "toolResults" jsonb;
