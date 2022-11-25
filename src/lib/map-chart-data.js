
export default (array) => {
  return array.map((item) => {
    const { datetime, head } = item;
    const dateParts = datetime.split(', ');
    const date = new Date(...dateParts);
    const hours = date.getHours().toString().padStart(2, '0');
    const formattedDate = `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() } ${ hours }:00`;

    return {
      date: formattedDate,
      head: parseFloat(head, 10),
    };
  });
};
