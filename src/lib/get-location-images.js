const EXTENSIONS = [ 'jpg', 'jpeg', 'png' ];
const DOMAIN = 'https://grondwater-ijmuiden.openearth.nl';

/**
 * Get borehole and location images for a location Id.
 * Since we don't know what images are available, we try a few different extesions.
 *
 * @param {string} id - The location Id.
 * @returns {Promise} - An array of available image urls.
 */
export default async function getLocationImages ({ id }) {
  const boreholeUrls = EXTENSIONS.map(ext => `${ DOMAIN }/static/boorgatmeting/${ id }.${ ext }`);
  const locationUrls = EXTENSIONS.map(ext => `${ DOMAIN }/static/fotos/${ id }.${ ext }`);
  const fetches = [ ...boreholeUrls, ...locationUrls ].map(url => fetch(url));

  const urls = await Promise.all(fetches)
    .then(res => res.filter(res => res.ok).map(res => res.url))
    .catch(() => null);

  return urls.filter(url => url);
}
