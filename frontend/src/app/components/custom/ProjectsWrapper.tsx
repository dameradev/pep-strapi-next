"use client";
import { useState, useEffect } from "react";
import PageHeader from '../PageHeader';
import { GraphQLClient, gql } from 'graphql-request';
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader } from 'lucide-react';
import RangeDatePicker from '../ui/RangeDatePicker';

const fetchProjects = async (page, pageSize, filters) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  const graphQLClient = new GraphQLClient(endpoint || "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    query Projects($page: Int, $pageSize: Int, $filters: ProjectFiltersInput) {
      projects(pagination: { page: $page, pageSize: $pageSize }, sort: "createdAt:desc", filters: $filters) {
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
        meta {
          pagination {
            total
            page
            pageSize
            pageCount
          }
        }
      }
    }
  `;

  const variables = {
    page: page,
    pageSize: pageSize,
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const projectsData = await fetchProjects(page, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT), buildFilters());
      if (page === 1) {
        setProjects(projectsData?.data);
      } else {
        setProjects(prevProjects => [...prevProjects, ...projectsData?.data]);
      }
      setTotalPages(projectsData?.meta?.pagination?.pageCount);
      setLoading(false);
    };

    loadProjects();
  }, [search, country, dateRange, page]);

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
    if (dateRange.from && dateRange.to) {
      filtersObj.startDate = { gte: new Date(dateRange.from).toISOString().split('T')[0] }; // Ensure only the date part is used
      filtersObj.endDate = { lte: new Date(dateRange.to).toISOString().split('T')[0] }; // Ensure only the date part is used
    }

    console.log(filtersObj);
    return filtersObj;
  };

  const loadMoreProjects = () => {
    setPage(prevPage => prevPage + 1);
  };

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
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          {loading && page === 1 ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <ul className="flex flex-col gap-10">
                {projects?.map((project) => (
                  <li className="" key={project.id}>
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
                        <Link href={`/project/${project.id}`}>
                          <h3 className="mb-2 text-xl font-medium leading-tight">
                            {project.attributes.title}
                          </h3>
                        </Link>
                        <p className="mb-4 text-base">
                          {project.attributes.description}
                        </p>
                        <p className="text-base text-surface/75 dark:text-neutral-300">
                          <small>{project.attributes.organization?.data?.attributes?.name}</small>
                        </p>
                        <Button variant="outline" className="mt-4">
                          <Link href={`/project/${project.id}`}>
                            View more details
                          </Link>
                        </Button>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              {page < totalPages && (
                <div className="flex justify-center mt-10">
                  <Button onClick={loadMoreProjects}>Load More</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
