import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/utils/axios";
import { Eye, EyeOff, Lock, RotateCcwKey, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      );
      if (data.success) {
        toast.success(data.message || "password reset successfully!");
      }
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit  min-h-screen  min-w-screen max-w-screen overflow-visible">
        <div className="relative bg-[linear-gradient(135deg,#0A1628_0%,#13254a_50%,#1E3A8A_100%)] flex p-12 justify-center items-center w-full h-239 overflow-hidden">
          <Card className="relative z-10 backdrop-blur-xl shadow-[0_0_60px_-12px_rgba(37,99,235,0.55)] rounded-3xl bg-white/90 border-blue-400/30 border-1 border-solid p-8 gap-6 w-120">
            <CardHeader className="text-center p-0 items-center gap-4">
              <div className="relative flex justify-center items-center">
                <div className="size-24 blur-md animate-pulse rounded-full bg-[#2b7fff]/15 absolute" />
                <div className="size-20 rounded-full border-[#2b7fff]/40 border-2 border-solid absolute" />
                <div className="relative size-16 shadow-[0_0_30px_-4px_rgba(37,99,235,0.8)] rounded-full bg-[#2b7fff] flex justify-center items-center">
                  <ShieldCheck className="size-8 text-blue-50" />
                </div>
              </div>

              <CardTitle className="font-bold text-zinc-950 text-2xl leading-8 tracking-tight">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-[#71717b] text-sm leading-5">
                Create a strong new password for your account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="new-password"
                    className="font-medium text-zinc-950 text-sm leading-5"
                  >
                    {" "}
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 size-4 -translate-y-1/2 text-[#71717b] absolute left-3" />
                    <Input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="rounded-lg px-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="top-1/2 -translate-y-1/2 text-[#71717b] absolute right-3"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="confirm-password"
                    className="font-medium text-zinc-950 text-sm leading-5"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 size-4 -translate-y-1/2 text-[#71717b] absolute left-3" />
                    <Input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      className="rounded-lg px-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="top-1/2 -translate-y-1/2 text-[#71717b] absolute right-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex p-0 flex-col gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="shadow-[0_8px_24px_-8px_rgba(37,99,235,0.7)] font-bold rounded-lg bg-[#2b7fff] text-blue-50 text-base leading-6 w-full h-12"
                >
                  <RotateCcwKey className="size-5" />
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
                <div className="text-[#71717b] text-xs leading-4 flex justify-center items-center gap-1.5">
                  <ShieldCheck className="size-3.5" />
                  <span>Secured with end-to-end encryption</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}



