import { stringify } from 'query-string';

export default function({ url, service, request, encode = true, ...rest }) {
  if (!request) {
    return undefined;
  }

  const options = { encode, sort: false };
  const params = stringify({ service, request, ...rest }, options);

  return `${ url }?${ params }`;
}
