import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "reactionRoles.json");

export type ReactionRoleCollection = {
  [collection: string]: { [emoji: string]: string };
};

export type ReactionRoleMessages = {
  [messageId: string]: string;
};

export let reactionRoleBinds: ReactionRoleCollection = {};
export let reactionRoleMessages: ReactionRoleMessages = {};

if (fs.existsSync(FILE_PATH)) {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  reactionRoleBinds = data.reactionRoleBinds || {};
  reactionRoleMessages = data.reactionRoleMessages || {};
}

export function saveReactionRoles() {
  fs.writeFileSync(
    FILE_PATH,
    JSON.stringify({ reactionRoleBinds, reactionRoleMessages }, null, 2),
    "utf-8",
  );
}
