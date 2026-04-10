import { categories, destinationsContent } from './destinations-content.js';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function resolveDestinationAssetPath(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function resolveDestinationRecord(record) {
  return {
    ...record,
    coverImage: resolveDestinationAssetPath(record.coverImage),
    images: Array.isArray(record.images)
      ? record.images.map((image) => resolveDestinationAssetPath(image))
      : [],
  };
}

export const destinations = destinationsContent.map((record) => resolveDestinationRecord(record));

export { categories, destinationsContent };
