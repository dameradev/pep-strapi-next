"use client";
import React from 'react';
import SingleProject from './SingleProject';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const ProjectList = ({ projects }) => {
  console.log(projects)
  return (


      <Carousel>
        <CarouselContent className="gap-4">
          {projects?.map((project) => (
            <CarouselItem className="basis-1/3 min-w-[400px]">
              <SingleProject project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    // <Carousel className="relative overflow-hidden" >
    //   <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
    //   <CarouselContent className="gap-4">
    //     {projects.map((project, index) => (
    //       <CarouselItem key={project.id} className="basis-1/3 md:basis-1/2">
    //         <SingleProject project={project} />
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselNext className="absolute right-0 bottom-0  transform -translate-y-1/2 z-10" />
    // </Carousel>
  );
};

export default ProjectList;
