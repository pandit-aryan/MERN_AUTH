import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/axios";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter you email");
    }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      if (data.success) {
        toast.success(data.message || "Reset password link sent");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="relative bg-[linear-gradient(135deg,#0A1628_0%,#13284D_50%,#1E3A8A_100%)] flex p-12 justify-center items-center w-full h-239 overflow-hidden">
        <Card className="relative z-10 border-[oklch(0.623_0.214_259.815/.4)] bg-[oklch(1_0_0/.08)] backdrop-blur-2xl shadow-[0_0_60px_oklch(0.623_0.214_259.815/.25)] rounded-3xl border-black/1 border-1 border-solid p-12 gap-8 w-120">
          <CardHeader className="text-center p-0 items-center gap-6">
            <Link
              to="/signin"
              className="inline-flex text-[oklch(0.75_0.16_250)] font-medium text-sm leading-5 self-start items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to Sign In
            </Link>
            <div className="relative flex justify-center items-center">
              <div className="size-24 bg-[radial-gradient(circle,oklch(0.623_0.214_259.815/.5),transparent_70%)] blur-xl animate-pulse rounded-full absolute" />
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle className="font-bold text-white text-3xl leading-9">
                Forgot Password?
              </CardTitle>
              <CardDescription className="leading-relaxed text-white/65 text-base">
                No worries! Enter your registered email address and we'll send
                you a password reset link.
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="flex p-0 flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="font-medium text-white/80 text-sm leading-5"
                ></Label>

                <div className="relative">
                  <Mail className="top-1/2 -translate-y-1/2 size-4 text-white/50 absolute left-3" />
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-[oklch(1_0_0/.06)] rounded-xl text-white border-white/15 border-0 border-solid pl-10 h-12"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="shadow-[0_8px_24px_oklch(0.623_0.214_259.815/.45)] font-bold rounded-xl bg-[#2b7fff] text-blue-50 w-full h-12"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}

