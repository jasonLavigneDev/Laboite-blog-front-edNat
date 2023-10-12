import sanitizeHtml from 'sanitize-html';

// allow iframes for embedded videos in blog articles
export const sanitizeParameters = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'iframe',
    'img',
    'audio',
    'video',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    iframe: ['src', 'frameborder', 'allowfullscreen'],
    span: ['contenteditable'],
    audio: ['preload', 'controls', 'src'],
    video: ['preload', 'controls', 'src', 'width'],
    a: ['href', 'name', 'target', 'rel'],
  },
  allowedClasses: {
    ...sanitizeHtml.defaults.allowedClasses,
    iframe: ['ql-video'],
    div: [
      'embed-audio',
      'audio-wrapper',
      'embed-responsive',
      'webcam-video-wrapper',
    ],
    audio: ['embed-responsive-audio-item'],
    video: ['embed-responsive-item'],
    p: ['ql-indent-*'],
  },
};

export default sanitizeParameters;
