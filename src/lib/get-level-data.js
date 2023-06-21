import geoServerUrl from './geoserver-url';
import mapChartData from '@/lib/map-chart-data';
import xmlToJson from '@/lib/xml-to-json';

/**
 * Get level data for a location based on the level id.
 *
 * @param {string} id - The level id.
 * @returns {Promise} - An object with level data.
 */
export default async function getLevelData ({ id }) {
  const url = await geoServerUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL + '/wps',
    request: 'Execute',
    service: 'wps',
    version: '2.0.0',
    Identifier: 'wps_gettimeseries',
    datainputs: `locationinfo={"locid": "${ id }", "parameter": "Zoetwaterstijghoogte gecorrigeerd voor dichtheid"}`,
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const rawData = xmlToJson(string);

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
