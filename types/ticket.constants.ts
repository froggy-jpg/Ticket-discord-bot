import { NONAME } from "dns";

export const TicketButtonLabels = {
  CREATE: "Apply",
  APPROVE: "Approve ticket",
  REJECT: "Deny ticket",
} as const;

export const TicketCommand = {
  NAME: "actions",
  DESCRIPTION: "Choose ticket actions",
} as const;

export const RoleSetupCommand = {
  NAME: "rolesetup",
  DESCRIPTION: "Open a role-picker creation menu!",

  INPUT_ROLE_NAME: "role",
  INPUT_DESCRIPTION_NAME: "Role to give",

  INPUT_EMOJI_NAME: "emoji",
  INPUT_EMOJI_DESCRIPTION: "Emoji for reaction",

  INPUT_COLLECTION_NAME: "collection",
  INPUT_COLLECTION_DESCRIPTION: "In what collection add this",
} as const;

export const RolePickerCommand = {
  NAME: "rolepicker",
  DESCRIPTION: "Create message with role-picking menu",
} as const;

export const CreateMessageCommand = {
  NAME: "create_message",
  DESCRIPTION: "Create a ticket invite message",

  INPUT_MESSAGE_NAME: "message",
  INPUT_MESSAGE_DESCRIPTION: "Custom ticket creation message",
} as const;

export const SendRoleMessageCommand = {
  NAME: "send_role_message",
  DESCRIPTION:
    "Send role picker message, with corresponding binds. Do not forget to disable user-free roles in a channel",

  INPUT_MESSAGE_NAME: "message",
  INPUT_MESSAGE_DESCRIPTION: "Message to send",

  INPUT_COLLECTION_NAME: "collection",
  INPUT_COLLECTION_DESCRIPTION: "What collection do you want to use",
};

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
  TICKET_ALREADY_EXIST: "You already have an existing ticket",
  NOT_ENOUGH_PERMISSIONS: "You don't have enough permissions",
  APPROVED_DELETE_REASON: "Ticket approved",
  REJECTED_DELETE_REASON: "Ticket rejected",
  UNKNOWN_ERROR: "An unknown error occurred",
  INVALID_EMOJI: "Invalid emoji:",
} as const;
