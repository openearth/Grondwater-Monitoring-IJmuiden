import geoServerUrl from './geoserver-url';
import mapChartData from '@/lib/map-chart-data';

/**
 * Get PH data for a location based on the PH id.
 *
 * @param {string} id - The PH id.
 * @returns {Promise} - An object with PH data.
 */
export default async function getPhData ({ id }) {
  const url = await geoServerUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL + '/wps',
    request: 'Execute',
    service: 'wps',
    version: '2.0.0',
    Identifier: 'wps_gettimeseries',
    datainputs: `locationinfo={"locid": "${ id }", "parameter": "Handmeting: pH"}`,
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const document = new window.DOMParser().parseFromString(string, 'text/xml');
      const element = document.getElementsByTagName('wps:ComplexData');
      const rawData = JSON.parse(element[0].innerHTML);

      const value = {
        parameters: rawData.parameterproperties,
        properties: rawData.locationproperties,
        statistics: rawData.locationstats,
        timeseries: mapChartData(rawData.timeseries),
      };

      if (value.errMsg) {
        return Promise.reject(value.errMsg);
      }

      return value ? value : null;
    })
    .catch(err => Promise.reject(err));
}
