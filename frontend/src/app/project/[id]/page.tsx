import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import request, { gql } from 'graphql-request';
import BlockRendererClient from '../../components/BlockRendererClient';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

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
          image  {
            data {
              attributes {
                url
              }
            }
          }
          startDate
          endDate
          externalLink
          projectActivity
          projectType
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

  const { title, startDate, endDate, content, externalLink, projectActivity, projectType, image  } = data.project.data.attributes;

  return (
    <>
    <section className="bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-8 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-32">
          {image && (
            <div className="lg:order-2">
              <Image
                className="w-full filter drop-shadow-2xl"
                src={image?.data?.[0]?.attributes.url} 
                alt={title}
                width={500}
                height={500}
              />
            </div>
          )}

          <div className="flex flex-col justify-between lg:order-1">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {title}
              </h2>
            </div>

            <div className="grid max-w-xs grid-cols-1 mt-10 gap-y-6 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 xl:mt-20 md:gap-x-16 lg:gap-x-8 xl:gap-x-16">
              {startDate && (
                <div>
                  <div className="w-24 h-px bg-gray-200"></div>
                  <h3 className="text-lg font-bold text-gray-900 mt-7">
                    Start Date
                  </h3>
                  <p className="mt-4 text-sm font-normal text-gray-600">
                    <time dateTime={startDate}>
                      {new Date(startDate).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              )}

              {endDate && (
                <div>
                  <div className="w-24 h-px bg-gray-200"></div>
                  <h3 className="text-lg font-bold text-gray-900 mt-7">
                    End Date
                  </h3>
                  <p className="mt-4 text-sm font-normal text-gray-600">
                    <time dateTime={endDate}>
                      {new Date(endDate).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              )}

              {projectActivity && (
                <div>
                  <div className="w-24 h-px bg-gray-200"></div>
                  <h3 className="text-lg font-bold text-gray-900 mt-7">
                    Project Activity
                  </h3>
                  <p className="mt-4 text-sm font-normal text-gray-600">
                    {projectActivity}
                  </p>
                </div>
              )}

              {projectType && (
                <div>
                  <div className="w-24 h-px bg-gray-200"></div>
                  <h3 className="text-lg font-bold text-gray-900 mt-7">
                    Project Type
                  </h3>
                  <p className="mt-4 text-sm font-normal text-gray-600">
                    {projectType}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="rich-text mt-32 prose prose-xl mx-auto">
          <BlockRendererClient content={content} />
        </div> */}
      </div>
    </section>
    <section>
           <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Apply now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </section>
    </>

  );
};

export default Project;