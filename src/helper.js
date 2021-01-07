import images from './images';

export const getSkeletonList = (length = 8) => {
  let list = [];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }
  return list;
}

export const getDefaultLanguage = () => {
  const lng = window.localStorage.getItem('i18nextLng');
  if (lng === 'en') return 'en';
  return 'zh';
}

export const trackEvent = (tag, name) => {
  try {
    window._hmt.push(['_trackEvent', tag, 'click', name]);
  } catch (e) {
    console.log(e);
  }
}

export const formatWebpImageSrc = (key = '') => {
  if (!key) return '';
  return images[key];
}