import Head from "next/head";
import React, { FC } from "react";

interface Meta {
  title: string;
  description: string;
}

const getTitle = (title: string) => `${title} | WebSocket`;

const Meta: FC<Meta> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ? (
          <>
            <meta name="description" content={description} />
            <meta name="title" content={getTitle(title)} />
          </>
        ) : (
          <>
            <meta name="robots" content="noindex, nofollow" />
          </>
        )}
      </Head>
    </>
  );
};

export default Meta;
