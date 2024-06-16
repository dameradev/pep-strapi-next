"use client";
import { useState, useEffect } from "react";
import PageHeader from '../PageHeader';
import { GraphQLClient, gql } from 'graphql-request';
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader } from 'lucide-react';
import RangeDatePicker from '../ui/RangeDatePicker';

const fetchProjects = async (start, limit, filters) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  const graphQLClient = new GraphQLClient(endpoint || "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    query Projects($start: Int, $limit: Int, $filters: ProjectFiltersInput) {
      projects(pagination: { start: $start, limit: $limit }, sort: "createdAt:desc", filters: $filters) {
        data {
          id
          attributes {
            title
            startDate
            endDate
            image {
              data {
                attributes {
                  url
                }
              }
            }
            organization {
              data {
                attributes {
                  name
                }
              }
            }
            tag {
              data {
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    start: start,
    limit: limit,
    filters: filters,
  };

  const responseData = await graphQLClient.request(query, variables);
  return responseData.projects;
};

const Profile = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const projectsData = await fetchProjects(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT), buildFilters());
      setProjects(projectsData?.data);
      setLoading(false);
    };

    loadProjects();
  }, [search, country, dateRange]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const buildFilters = () => {
    const filtersObj = {};
    if (search) {
      filtersObj.or = [
        { title: { contains: search } },
        { projectType: { contains: search } },
        { projectActivity: { contains: search } },
        { country: { contains: search } }
      ];
    }
    if (country) {
      filtersObj.country = { eq: country };
    }
    console.log(new Date(dateRange.from))
    console.log(new Date(dateRange.to).toUTCString())
    if (dateRange.from && dateRange.to) {
      filtersObj.startDate = { gte: new Date(dateRange.from).toISOString().split('T')[0] }; // Ensure only the date part is used
      filtersObj.endDate = { lte: new Date(dateRange.to).toISOString().split('T')[0] }; // Ensure only the date part is used
    }

    console.log(filtersObj);
    return filtersObj;
  };
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: startDate,
  //   to: endDate,
  // })
  return (
    <div className='px-10 mt-20'>
      <PageHeader heading="Our Projects" text="Filter to find the one that suits you" />
      <div className="px-10 mt-10 grid grid-cols-[30%_1fr] container mx-auto gap-10">
        <div>
          <h2 className="mb-10">Filters</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name, Activity, or Type"
              value={search}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <select
              name="country"
              value={country}
              onChange={handleCountryChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Country</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Serbia">Serbia</option>
              <option value="Bulgaria">Bulgaria</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="mb-4">
            <RangeDatePicker
              date={dateRange}
              setDate={setDateRange}
              // startDate={dateRange.startDate}
              // endDate={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <ul className="flex flex-col gap-10">
              {projects?.map((project) => (
                <li className="" key={project.id}>
                  <Link href={`/project/${project.id}`}>
                    <article className="grid grid-cols-[40%_1fr] rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark text-surface h-[20rem]">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <Image
                          className="rounded-lg"
                          src={project.attributes.image?.data?.attributes?.url}
                          fill
                          alt={project.attributes.title}
                        />
                      </div>
                      <div className="p-6">
                        <h5 className="mb-2 text-xl font-medium leading-tight">
                          {project.attributes.title}
                        </h5>
                        <p className="mb-4 text-base">
                          {project.attributes.description}
                        </p>
                        <p className="text-base text-surface/75 dark:text-neutral-300">
                          <small>{project.attributes.organization?.data?.attributes?.name}</small>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
