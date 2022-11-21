import geoServerUrl from './geoserver-url';

export default async function getLocationTimeseries ({ id }) {
  const url = await geoServerUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL + '/wps',
    request: 'Execute',
    service: 'wps',
    version: '2.0.0',
    Identifier: 'wps_gettimeseries',
    datainputs: `locationinfo={"locid": "${ id }"}`,
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const document = new window.DOMParser().parseFromString(string, 'text/xml');
      const element = document.getElementsByTagName('wps:ComplexData');
      const value = element[0].innerHTML;

      if (value.errMsg) {
        return Promise.reject(value.errMsg);
      }

      console.log(value);

      return value ? value : null;
    })
    .catch(err => Promise.reject(err));
}
