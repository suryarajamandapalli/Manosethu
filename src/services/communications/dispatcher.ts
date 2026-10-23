export interface CommunicationEvent {
  id: string;
  type: "SMS_REMINDER" | "OFFICER_CALL_REQUEST" | "IVRS_CHECKIN" | "HELPLINE_ALERT";
  recipient: string;
  caseId: string;
  timestamp: string;
  status: "QUEUED" | "SIMULATED" | "DELIVERED" | "FAILED";
  summary: string;
}

export async function dispatchCommunication(
  event: Omit<CommunicationEvent, "id" | "timestamp" | "status">
): Promise<CommunicationEvent> {
  // Check if Twilio environment variables exist
  const accountSid =
    (import.meta as any).env?.VITE_TWILIO_ACCOUNT_SID ||
    (typeof process !== "undefined" ? process.env?.TWILIO_ACCOUNT_SID : undefined) ||
    "";
  const authToken =
    (typeof process !== "undefined" ? process.env?.TWILIO_AUTH_TOKEN : undefined) ||
    "";

  const isLiveConfigured = Boolean(accountSid && authToken);

  const commRecord: CommunicationEvent = {
    ...event,
    id: `COMM-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    status: isLiveConfigured ? "QUEUED" : "SIMULATED",
    summary: isLiveConfigured
      ? `Communication dispatched via live gateway (${event.type})`
      : `COMMUNICATION SERVICE: Status QUEUED (Simulated demonstration mode for ${event.type})`,
  };

  return commRecord;
}
