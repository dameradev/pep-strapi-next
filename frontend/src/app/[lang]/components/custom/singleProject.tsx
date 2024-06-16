"use client";
import React from 'react';
import Link from 'next/link';

const SingleProject = ({ project }: { project: any }) => {
  const projectAttr = project.attributes;
  return (
    <article key={project.id} className="bg-white basis-1/3  border-[1px] rounded-lg p-6 mb-4 h-[20rem] text-black">
      
      <Link className='cursor-pointer' href={`/project/${project.id}`}>
        <h2 className="text-2xl font-bold mb-2">{projectAttr.title}</h2>
      </Link>

      <div className="flex items-center mb-4 ">
        
        <div>
          <p><strong>Start Date:</strong> {new Date(projectAttr.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(projectAttr.endDate).toLocaleDateString()}</p>
        </div>
      </div>
      <a
        href={projectAttr.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline block"
      >
        External Link
      </a>
      {/* <Dialog>
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
      </Dialog> */}
      
    </article>
  );
};

export default SingleProject;