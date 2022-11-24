import geoServerUrl from './geoserver-url';
import mapChartData from '@/lib/map-chart-data';

export default async function getLevelData ({ id }) {
  const url = await geoServerUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL + '/wps',
    request: 'Execute',
    service: 'wps',
    version: '2.0.0',
    Identifier: 'wps_gettimeseries',
    datainputs: `locationinfo={"locid": "${ id }", "parameter": "Divermeting: grondwaterstand"}`,
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const document = new window.DOMParser().parseFromString(string, 'text/xml');
      const element = document.getElementsByTagName('wps:ComplexData');
      const rawData = JSON.parse(element[0].innerHTML);

      const value = {
        location: rawData.locationproperties,
        timeseries: mapChartData(rawData.timeseries),
      };

      if (value.errMsg) {
        return Promise.reject(value.errMsg);
      }

      return value ? value : null;
    })
    .catch(err => Promise.reject(err));
}
