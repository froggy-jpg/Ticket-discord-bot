import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "reactionRoles.json");

export type ReactionRoleCollection = {
  [collection: string]: { [emoji: string]: string }; // emoji → roleId
};

export type ReactionRoleMessages = {
  [messageId: string]: string; // messageId → collection
};

export let reactionRoleBinds: ReactionRoleCollection = {};
export let reactionRoleMessages: ReactionRoleMessages = {};

// загрузка при старте
if (fs.existsSync(FILE_PATH)) {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  reactionRoleBinds = data.reactionRoleBinds || {};
  reactionRoleMessages = data.reactionRoleMessages || {};
}

// функция сохранения
export function saveReactionRoles() {
  fs.writeFileSync(
    FILE_PATH,
    JSON.stringify({ reactionRoleBinds, reactionRoleMessages }, null, 2),
    "utf-8",
  );
}
