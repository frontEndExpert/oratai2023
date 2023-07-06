import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription = 'OrataiPhathai Website';
const defaultOGURL = 'http://www.orataiphathai.work';
const defaultOGImage = '';


const Head = (props: any) => (
  <NextHead>
    <meta charSet="UTF-8" />

    <title>{props.title || ''}</title>
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:image"
      content={props.ogImage || defaultOGImage}
    />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="description" content={props.description || defaultDescription} />
    <meta name="author" content="Aylon Spigel" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />


  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head;