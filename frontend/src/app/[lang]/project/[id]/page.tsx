import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchAPI } from '../../utils/fetch-api';
import request, { gql } from 'graphql-request';

interface ProjectProps {
  project: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    externalLink: string;
    publishedAt: string;
    updatedAt: string;
  };
}

const GET_SINGLE_PROJECT = gql`
  query GetSingleProject($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
          content
          externalLink
          startDate
          endDate
          externalLink
        }
      }
    }
  }
`

const Project: NextPage<ProjectProps> = async ({ params }) => {
  const uri = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const { id } = params



  const data = await request(`${uri}/graphql`, GET_SINGLE_PROJECT, {
    id
  });

  if (!data) {
    return { notFound: true };
  }
  console.log(data, 'data')

  const { title, startDate, endDate, description, externalLink, content  } = data.project.data.attributes;

  console.log(title, startDate, endDate, description, externalLink, 'data')
  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4 bg-white text-black  shadow-md rounded-md">
        <section className="mb-4">
          <h2 className="text-2xl font-semibold">Project Timeline</h2>
          <p>Start Date: <time dateTime={startDate}>{new Date(startDate).toLocaleDateString()}</time></p>
          <p>End Date: <time dateTime={endDate}>{new Date(endDate).toLocaleDateString()}</time></p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold">Project Description</h2>
          <div className="prose" dangerouslySetInnerHTML={{__html: content}} />
            
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold">External Link</h2>
          <a href={externalLink} className="text-blue-500 underline">{externalLink}</a>
        </section>
      </main>

      
    </>
  );
}
export default Project;