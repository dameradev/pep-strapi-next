"use client";
// import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
// import { DialogFooter, DialogHeader } from '../ui/dialog';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Label } from '@radix-ui/react-label';
import React from 'react';
import Link from 'next/link';

const SingleProject = ({ project }: { project: any }) => {
  return (
    <article key={project.id} className="bg-white basis-1/3 shadow-xl border-[1px] rounded-lg p-6 mb-4 h-[20rem] text-black">
      
      <Link className='cursor-pointer' href={`project/${project.id}`}>
        <h2 className="text-2xl font-bold mb-2">{project.title}da</h2>
      </Link>

      <div className="mb-4" dangerouslySetInnerHTML={{ __html: project.content }} />
      <div className="flex items-center mb-4 ">
        {project?.image && <img
          src={project.image}
          alt={project.title}
          className="w-32 h-32 object-cover rounded-lg mr-4"
        />}
        <div>
          <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
        </div>
      </div>
      <a
        href={project.externalLink}
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