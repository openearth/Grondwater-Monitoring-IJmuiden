
export default (array) => {
  return array.map((item) => {
    const { id, datetime, value_1, unit_1, value_2, unit_2 } = item;
    const dateParts = datetime.split(', ');
    const date = new Date(...dateParts);
    const formattedDate = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/');

    return {
      id,
      date: formattedDate,
      depth: parseFloat(value_1, 10),
      depthUnit: unit_1,
      temperature: parseFloat(value_2, 10),
      temperatureUnit: unit_2,
    };
  });
};
