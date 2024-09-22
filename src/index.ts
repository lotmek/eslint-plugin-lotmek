import { RuleModule } from "@typescript-eslint/utils/ts-eslint";
import { ESLint } from "eslint";
import { rules } from "./rules";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageInfo = require("../package.json");

type RuleKey = keyof typeof rules;

interface Plugin extends Omit<ESLint.Plugin, "rules"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: Record<RuleKey, RuleModule<any, any, any>>;
}

const plugin: Plugin = {
  meta: {
    name: packageInfo.name,
    version: packageInfo.version,
  },
  rules,
};

export default plugin;
