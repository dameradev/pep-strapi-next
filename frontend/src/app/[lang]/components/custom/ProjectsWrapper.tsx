"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from '../PageHeader';
import ProjectList from './projectList';
import { Loader } from 'lucide-react';
import { fetchAPI } from '../../utils/fetch-api';

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}


const fetchProjects = async (start: number, limit: number) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/projects`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      image: { fields: ["url"] },
      organization: { populate: "*" },
      tag: { populate: "*" },
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const responseData = await fetchAPI(path, urlParamsObject, options);
  return responseData;
};


const Profile = async ({ params }) => {
 
  const projectsData = await fetchProjects(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));

  console.log(projectsData);
  const projects = projectsData?.data;
  const meta = projectsData.meta;

  return (
    <div className='px-10'>

        <PageHeader heading="Our Projects" text="Checkout Our Amazing Projects" />
        <ProjectList projects={projects} meta={meta}>
          
        </ProjectList>
    </div>
  );
};

export default Profile;