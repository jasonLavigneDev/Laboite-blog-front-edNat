import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export const modifiedColorSyntax = (context, options) => {
  const newContext = { ...context };
  newContext.i18n.langs.values = new Array(41).fill({
    OK: "OK",
    "Text color": "Text color",
  });
  return colorSyntax(newContext, options);
};
