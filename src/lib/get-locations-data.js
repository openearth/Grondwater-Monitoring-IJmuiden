import geoServerUrl from './geoserver-url';

export default async function getLocationsData () {
  const url = await geoServerUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL + '/wps',
    request: 'Execute',
    service: 'wps',
    version: '2.0.0',
    Identifier: 'wps_read_gwslocations',
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const document = new window.DOMParser().parseFromString(string, 'text/xml');
      const element = document.getElementsByTagName('wps:ComplexData');
      const value = JSON.parse(element[0].innerHTML);

      if (value.errMsg) {
        return Promise.reject(value.errMsg);
      }

      return value ? value : null;
    })
    .catch(err => Promise.reject(err));
}
