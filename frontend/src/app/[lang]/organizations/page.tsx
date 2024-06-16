"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Loader } from "lucide-react";
import { fetchAPI } from "../utils/fetch-api";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

const fetchOrganizations = async (start: number, limit: number) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/organizations`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      image: { fields: ["url"] },
      projects: { populate: "*" },
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
  const organizationsData = await fetchOrganizations(
    0,
    Number(process.env.NEXT_PUBLIC_PAGE_LIMIT)
  );

  const organizations = organizationsData?.data;
  const meta = organizationsData.meta;

  return (
    <div className="px-10 mt-10 grid grid-cols-[20%_1fr]">
      <div>
        Filters
        {/* Add search field, country field, type of organization field */}
      </div>
      <ul>
        {organizations?.map((organization) => (
          <li className="" key={organization.id}>
            {console.log(organization)}
            <Link href={`/organization/${organization.id}`}>
              <article className="grid grid-cols-[35%_1fr] rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark text-surface h-[20rem]">
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                  <Image
                    className="rounded-lg"
                    src={organization.attributes.image?.data.attributes?.url}
                    fill
                  />
                </div>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight">
                    {organization.attributes.name}
                  </h5>
                  <p className="mb-4 text-base">
                    {organization.attributes.whoAreWe}
                  </p>
                  <p className="text-base text-surface/75 dark:text-neutral-300">
                    <small>{organization.attributes.email}</small>
                  </p>
                  <Button variant="outline" className="mt-4">
                    View more details
                  </Button>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
