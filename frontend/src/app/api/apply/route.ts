import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type ResponseData = {
  message: string;
  error?: string;
};

export async function PUT(
  req: any,
  res: NextApiResponse<ResponseData>
) {
  
  const body = await req.json()
  const { userId, reason, projectId, email } = body;
  console.log(email)
  console.log(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${projectId}`)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`, // Assuming you have JWT in session
      },
      body: JSON.stringify({
        data: {
          applicants: {
            connect: [{ id: userId }]
          }
        }
      }),
    });

    console.log(response, "response");

    return NextResponse.json({ message: 'Hello from server' })
  } catch (error) {
    console.error("An error occurred while applying to the project:", error);
    return NextResponse.json({ msg: 'Hello from server' })
  }
}
