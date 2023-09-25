import sanitizeHtml from 'sanitize-html';

// allow iframes for embedded videos in blog articles
const sanitizeParameters = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedClasses,
    iframe: ['src', 'frameborder', 'allowfullscreen'],
    span: ['contenteditable'],
  },
  allowedClasses: {
    ...sanitizeHtml.defaults.allowedClasses,
    iframe: ['ql-video'],
  },
};

export default sanitizeParameters;
