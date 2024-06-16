import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchAPI } from "../../utils/fetch-api";
import request, { gql } from "graphql-request";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RichText from "../../components/RichText";
import BlockRendererClient from "../../components/BlockRendererClient";
import ProjectList from "../../components/custom/projectList";
import Features from "../../components/Features";

interface OrganizationProps {
  organization: {
    id: string;
    name: string;
    foundedDate: string;
    description: string;
    website: string;
    publishedAt: string;
    updatedAt: string;
  };
}

const GET_SINGLE_ORGANIZATION = gql`
  query GetSingleOrganization($id: ID!) {
    organization(id: $id) {
      data {
        id
        attributes {
          name
          website
          image {
            data {
              attributes {
                url
              }
            }
          }
          description
          email
          phoneNumber

          whoAreWe
          ourVision
          whatWeDo

          projects {
            data {
              id
              attributes {
                title
                startDate
                endDate
              }
            }
          }
        }
      }
    }
  }
`;

const Organization: NextPage<OrganizationProps> = async ({ params }) => {
  const uri = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const { id } = params;

  let data;
  try {
    data = await request(`${uri}/graphql`, GET_SINGLE_ORGANIZATION, {
      id,
    });
  } catch (e) {
    console.error(e);
  }

  if (!data) {
    return { notFound: true };
  }

  const { name, description, website, image, email, phoneNumber, projects, whoAreWe, ourVision, whatWeDo } =
    data.organization.data.attributes;

  console.log(projects);

  return (
    <>
      <section className=" bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-8 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-32">
            {image && (
              <div className="lg:order-2">
                <img
                  className="w-full filter drop-shadow-2xl"
                  src={image.data.attributes.url}
                  alt={name}
                />
              </div>
            )}

            <div className="flex flex-col justify-between lg:order-1">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {name}
                </h2>
              </div>

              <div className="grid max-w-xs grid-cols-1 mt-10 gap-y-6 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 xl:mt-20 md:gap-x-16 lg:gap-x-8 xl:gap-x-16">
                {website && (
                  <div>
                    <div className="w-24 h-px bg-gray-200"></div>
                    <h3 className="text-lg font-bold text-gray-900 mt-7">
                      Website
                    </h3>
                    <p className="mt-4 text-sm font-normal text-gray-600">
                      <a
                        href={website}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {website}
                      </a>
                    </p>
                  </div>
                )}

                {email && (
                  <div>
                    <div className="w-24 h-px bg-gray-200"></div>
                    <h3 className="text-lg font-bold text-gray-900 mt-7">
                      Email
                    </h3>
                    <p className="mt-4 text-sm font-normal text-gray-600">
                      <a
                        href={`mailto:${email}`}
                        className="text-blue-500 underline"
                      >
                        {email}
                      </a>
                    </p>
                  </div>
                )}

                {phoneNumber && (
                  <div>
                    <div className="w-24 h-px bg-gray-200"></div>
                    <h3 className="text-lg font-bold text-gray-900 mt-7">
                      Phone Number
                    </h3>
                    <p className="mt-4 text-sm font-normal text-gray-600">
                      {phoneNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rich-text mt-20 prose prose-xl mx-auto">
            <BlockRendererClient content={description} />
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-12 px-10 md:px-0">
        <h2 className="mb-6">Our projects</h2>

        <ProjectList projects={projects.data} />
      </section>

      <section>
        <Features data={{
          heading: "More about us",
          description: "Discover more about our organization",
          feature: [
            {
              id: "1",
              title: "Who are we",
              description: whoAreWe,
            },
            {
              id: "3",
              title: "What we do",
              description: whatWeDo,
            },
            {
              id: "2",
              title: "Our Vision",
              description: ourVision,
            },
          ]
        }} />
      </section>
    </>
  );
};
export default Organization;
