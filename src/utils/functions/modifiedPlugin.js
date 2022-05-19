import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export const modifiedColorSyntax = (context, options) => {
  const newContext = { ...context };
  const { values } = context.i18n.langs;

  let newValues;

  if (values.length === 0) {
    newValues = new Array(41).fill({
      OK: "OK",
      "Text color": "Text color",
    });
  }
  newContext.i18n.langs.values = newValues;
  return colorSyntax(newContext, options);
};
