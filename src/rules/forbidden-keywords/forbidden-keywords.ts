import { ESLintUtils } from "@typescript-eslint/utils";

export const forbiddenKeywords = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Ensure variables and values do not contain forbidden keywords.",
    },
    messages: {
      "forbidden-variable": "Variable '{{variable}}' contains a forbidden keyword.",
      "forbidden-value": "Value '{{value}}' contains a forbidden keyword.",
    },
    schema: [
      {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      keywords: [],
    },
  ],
  create(context, [options]) {
    const keywords = options.keywords;

    return {
      VariableDeclarator(node) {
        const variables = context.sourceCode.getDeclaredVariables(node);

        variables.forEach((variable) => {
          if (keywords.some((word) => variable.name.includes(word))) {
            context.report({
              node,
              messageId: "forbidden-variable",
              data: {
                variable: variable.name,
              },
            });
          }
        });
      },

      Literal(node) {
        if (
          typeof node.value === "string" &&
          keywords.some((word) => {
            node.value.toLowerCase().includes(word);
          })
        ) {
          context.report({
            node,
            messageId: "forbidden-value",
            data: {
              value: node.value,
            },
          });
        }
      },
    };
  },
});
