import NextHead from 'next/head';
import { string } from 'prop-types';


const Head = (props: any) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="description" content={props.description} />

  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head;
