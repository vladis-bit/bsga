import { supabase } from "@/integrations/supabase/client";

/**
 * Fire-and-forget e-mail notification for a stored contact message.
 * Never blocks or fails the form submission.
 */
export async function notifyContactMessage(messageId: string) {
  try {
    const { error } = await supabase.functions.invoke("send-contact-notification", {
      body: { messageId },
    });
    if (error) console.error("send-contact-notification failed:", error);
  } catch (e) {
    console.error("send-contact-notification failed:", e);
  }
}

export const newMessageId = () => crypto.randomUUID();
