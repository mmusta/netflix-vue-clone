export const getImageUrl = (image) => (image ? `${image.path}.${image.extension}` : null);

export const generatePath = (path, params) => {
  let newPath = path;

  Object.entries(params).forEach(([paramKey, paramValue]) => {
    newPath = newPath.replace(`:${paramKey}`, paramValue);
  });

  return newPath;
};

export const ImageExtension = {
  PNG: 'png',
  WEBP: 'webp',
};

export const getImageResource = ({ imageName, extension }) => `/images/${imageName}.${extension}`;

export const HEADER_COMIC_ID = 12;
