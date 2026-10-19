import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/utils/axios";
import {
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  KeyRound,
  LayoutGrid,
  LogOut,
  ShieldCheck,
  User,
  UserCog,
  ChevronDown,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkAuth = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check-auth");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.post("/auth/logout");
      toast.success(data.message || "Logout successful");
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit min-h-screen min-w-screen max-w-screen overflow-visible">
        <nav className="bg-[#0A1628] flex px-12 py-4 justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-[#2b7fff] flex justify-center items-center">
              <ShieldCheck className="size-5 text-blue-50" />
            </div>
            <span className="font-bold text-white text-lg leading-7 tracking-tight">
              AuthFlow
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a className="relative font-medium text-white text-sm leading-5 pb-1">
              Home
            </a>
            <a className="font-medium text-white/70 text-sm leading-5 pb-1">
              Features
            </a>
            <a className="font-medium text-white/70 text-sm leading-5 pb-1">
              About
            </a>
            <a className="font-medium text-white/70 text-sm leading-5 pb-1">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/80">
              <Bell className="size-5" />
              <span className="size-2 rounded-full bg-[#e7000b] absolute -right-1 -top-1" />
            </button>

            <div className="cursor-pointer flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-[#2b7fff] text-blue-50 text-xs leading-4">
                  {getInitials(user?.fullname)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-white text-sm leading-5">
                {user?.fullname}
              </span>
              <ChevronDown className="size-4 text-white/70" />
            </div>
          </div>
        </nav>

        <section className="bg-[linear-gradient(135deg,#1E3A8A_0%,#2563EB_100%)] p-12 w-full">
          <div className="max-w-2xl flex flex-col gap-4">
            <h1 className="font-bold text-white text-3xl leading-9 tracking-tight sm:text-4xl sm:leading-10">
              Welcome back, {user?.fullname?.split(" ")[0]}! 👋
            </h1>
            <p className="text-white/80 text-base leading-6">
              You're successfully logged in. Explore your dashboard below.
            </p>

            <div className="flex mt-2 items-center gap-4">
              <Button className="bg-white text-blue-900 px-6">
                <User className="size-4" />
                Go to Profile
              </Button>

              <Button
                variant="outline"
                className="bg-transparent text-white border-white border-0 border-solid px-6"
              >
                <LayoutGrid className="size-4" />
                Explore Features
              </Button>
            </div>
          </div>
        </section>

        <div className="bg-zinc-100 flex px-12 py-8 flex-col gap-8 w-full">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                <span className="font-medium text-[#71717b] text-sm leading-5">
                  Account Status
                </span>
                <div className="size-10 rounded-lg bg-[#2b7fff]/10 flex justify-center items-center">
                  <BadgeCheck className="size-5 text-[#2b7fff]" />
                </div>
              </CardHeader>

              <CardContent className="flex p-0 items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <span className="font-bold text-emerald-600 text-xl leading-7">
                  {user?.isVerified ? "Verified" : "Not Verified"}
                </span>
              </CardContent>
            </Card>

            <Card className="p-6 gap-4">
              <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                <span className="font-medium text-[#71717b] text-sm leading-5">
                  Member Since
                </span>
                <div className="size-10 rounded-lg bg-[#2b7fff]/10 flex justify-center items-center">
                  <CalendarDays className="size-5 text-[#2b7fff]" />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <span className="font-bold text-zinc-950 text-xl leading-7">
                  {formatDate(user?.createdAt)}
                </span>
              </CardContent>
            </Card>

            <Card className="p-6 gap-4">
              <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                <span className="font-medium text-[#71717b] text-sm leading-5">
                  Last Login
                </span>
                <div className="size-10 rounded-lg bg-[#2b7fff]/10 flex justify-center items-center">
                  <Clock className="size-5 text-[#2b7fff]" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <span className="font-bold text-zinc-950 text-xl leading-7">
                  {formatTime(user?.lastLogin)}
                </span>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2 p-6 gap-4">
              <CardHeader className="p-0 gap-1">
                <CardTitle className="font-semibold text-lg leading-7">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-[#71717b] text-sm leading-5">
                  Your latest account events
                </CardDescription>
              </CardHeader>

              <CardContent className="flex p-0 flex-col gap-2">
                <div className="border-zinc-200 border-b-1 border-solid flex py-2 items-start gap-4">
                  <div className="size-2 shrink-0 rounded-full bg-[#2b7fff] mt-1.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-zinc-950 text-sm leading-5">
                      Logged in successfully
                    </span>
                    <span className="text-[#71717b] text-sm leading-5">
                      {formatTime(user?.lastLogin)}
                    </span>
                  </div>
                </div>

                <div className="flex py-2 items-start gap-4">
                  <div className="size-2 shrink-0 rounded-full bg-[#2b7fff] mt-1.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-zinc-950 text-sm leading-5">
                      Account created
                    </span>
                    <span className="text-[#71717b] text-sm leading-5">
                      {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 gap-4">
              <CardHeader className="p-0 gap-1">
                <CardTitle className="font-semibold text-lg leading-7">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-[#71717b] text-sm leading-5">
                  Manage your account
                </CardDescription>
              </CardHeader>

              <CardContent className="flex p-0 flex-col gap-2">
                <Button
                  variant="outline"
                  className="text-[#2b7fff] border-[#2b7fff]/30 border-0 border-solid justify-start gap-2 w-full"
                >
                  <UserCog className="size-4" />
                  Edit Profile
                </Button>

                <Button
                  variant="outline"
                  className="text-[#2b7fff] border-[#2b7fff]/30 border-0 border-solid justify-start gap-2 w-full"
                >
                  <KeyRound className="size-4" />
                  Change Password
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-[#e7000b] border-[#e7000b]/30 border-0 border-solid justify-start gap-2 w-full"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
