import { Button } from "@/components/ui/button";
import { loginRequest } from "@/config/auth-config";
import { useLogin } from "@/hooks/auth/login";
import { useMsal } from "@azure/msal-react";
import akerLogo from "@images/brand/aker-logo.png";
import loginImage from "@images/login-side-img.png";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const token = context.token;
    if (token) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  const { instance } = useMsal();
  const { mutate } = useLogin();
  // const token = useToken();

  const handleLoginRedirect = async () => {
    await instance.loginPopup(loginRequest).then(async (res) => {
      console.log({ res });
      mutate(res.accessToken);

      const url = await fetchProfileImage(res.accessToken);
      const details = await fetchCompanyAndDepartment(res.accessToken);
      console.log(url, details);
    });
  };

  const fetchCompanyAndDepartment = async (accessToken: string) => {
    try {
      // Fetch user details
      const userResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userResponse.json();
      console.log("User Data:", userData);

      // Fetch organization details
      const orgResponse = await fetch(
        "https://graph.microsoft.com/v1.0/organization",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orgData = await orgResponse.json();
      console.log("Organization Data:", orgData);

      return {
        companyName: orgData?.value?.[0]?.displayName || "Unknown Company",
        department: userData?.department || "Unknown Department",
      };
    } catch (error) {
      console.error("Error fetching company and department:", error);
      return null;
    }
  };

  const fetchProfileImage = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile image");
      }

      console.log(response, "<<<<<<<<<<<<");

      // Convert response to blob URL
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      return null;
    }
  };

  return (
    <div className="p-4 box-border h-screen min-h-[600px]">
      <section className="flex flex-wrap h-full">
        <section className="w-1/2 flex flex-col justify-between">
          <div>
            <img src={akerLogo} />
          </div>
          <div className="flex flex-col gap-10 items-start">
            <div>
              <h1 className=" mb-2">Welcome to Helix!</h1>
              <p className="font-helvetica">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam
                finibus <br /> ornare finibus interdum.
              </p>
            </div>
            <Button onClick={handleLoginRedirect} variant={"outline"}>
              Sign In
            </Button>
            <div className="font-helvetica">
              <p className="font-medium tracking-wide ">
                Having trouble signing in?{" "}
              </p>
              <p className="underline font-light tracking-wider">Click Here</p>
            </div>
          </div>
          <p className="flex font-helvetica">
            Developed by DigiHub, Mumbai, Aker Solutions
          </p>
        </section>
        <section className="w-1/2 h-full relative">
          <img className="w-full h-full" src={loginImage} />
          <div className="bg-background aspect-square  w-1/4  absolute bottom-0 right-0"></div>
        </section>
      </section>
    </div>
  );
}
