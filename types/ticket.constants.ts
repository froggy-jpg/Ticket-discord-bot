export const TicketButtonLabels = {
  CREATE: "Apply",
  APPROVE: "Approve ticket",
  REJECT: "Deny ticket",
} as const;

export const TicketCommand = {
  NAME: "actions", 
  DESCRIPTION: "Choose ticket actions",
} as const;

export const CreateMessageCommand = {
  NAME: "create_message", 
  DESCRIPTION: "Create a ticket invite message",

  INPUT_MESSAGE_NAME: "message",
  INPUT_MESSAGE_DESCRIPTION: "Custom ticket creation message",
} as const;

export const TicketMessageContent = {
  ACTIONS_PROMPT: "Choose ticket actions!",
  CREATED_REPLY: "Created!",
} as const;

export const TicketReplies = {
  NO_MEMBER: "No member exist",
  ALREADY_VERIFIED: "You are alerady verified",
  CHAT_RULES:
    "Plese send proof of your hrt or the fact of you seeking it. It will be manually reviewed. Channel will be deleted after approval. \nПожалуйста, скиньте доказательства вашей транзиции, или то что вы в процессе ее получения. Оно будет проверенно вручную. Канал будет удален после проверки.",
  NOT_IN_TICKET_CHANNEL: "Not in a ticket channel",
  CANT_DEFINE_OWNER_ID: "No owner id",
  NOT_ENOUGH_PERMISSIONS: "You don't have enough permissions",
  APPROVED_DELETE_REASON: "Ticket approved",
  REJECTED_DELETE_REASON: "Ticket rejected",
  UNKNOWN_ERROR: "An unknown error occurred",
} as const;
