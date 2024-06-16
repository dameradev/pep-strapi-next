"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/app/components/ui/input";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
const ProjectApply = ({ project }) => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  console.log(user)
  const [userData, setUserData] = useState({
    name: user?.name,
    project: project.title,
    projectId: project.id,
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/apply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.strapiUserId || "",
          reason: userData.reason,
          projectId: userData.projectId,
          email: user?.email,
        }),
      });

    //   if (response.ok) {
    //     router.push(`/project/${project.id}?successful-application=true`);
    //   } else {
    //     // Handle error
    //     console.error("Failed to apply to the project");
    //   }
    } catch (error) {
      console.error("An error occurred while applying to the project:", error);
    }
  };

  return (
    <section>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Apply now</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <div className="text-center flex flex-col gap-4">
              <DialogTitle>Apply to project</DialogTitle>
              <DialogDescription>
                Please fill out the form below to apply to this project
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Project
                </Label>
                <Input
                  disabled
                  id="name"
                  value={project.title || ""}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  disabled
                  id="name"
                  value={user?.name || ""}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="name" className=" ">
                  Reason for applying
                </Label>
                <Textarea
                  // disabled
                  id="reason"
                  onChange={(e) =>
                    setUserData({ ...userData, reason: e.target.value })
                  }
                  value={userData.reason}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Apply now</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectApply;
