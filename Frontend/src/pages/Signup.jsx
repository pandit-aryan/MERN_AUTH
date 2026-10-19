import { useState } from "react";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";

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
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/utils/axios";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/signup", formData);
      if (data.success) {
        toast.success(data.message || "Account Created Successfully");
        navigate("/verify-account");
      } else {
        toast.error(data.message || "Unable to create account");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white text-zinc-950 max-w-full w-full   overflow-visible">
      <div className="relative bg-[radial-gradient(circle_at_20%_20%,oklch(0.35_0.12_264/.6),transparent_45%),radial-gradient(circle_at_80%_80%,oklch(0.4_0.15_264/.5),transparent_45%),linear-gradient(135deg,oklch(0.18_0.06_264),oklch(0.32_0.13_264))] flex mx-auto p-12 justify-center items-center w-full h-239 overflow-hidden">
        <div className="relative bg-[conic-gradient(from_0deg,oklch(0.623_0.214_259.815/.9),transparent_120deg,oklch(0.623_0.214_259.815/.6)_240deg,transparent_360deg)] shadow-[0_30px_80px_-20px_oklch(0.18_0.06_264/.8)] rounded-3xl p-[1.5px] w-115">
          <Card className="backdrop-blur-xl rounded-3xl bg-white/95 border-black/1 border-0 border-solid p-8 gap-6 w-full">
            <CardHeader className="flex p-0 flex-col items-center gap-2">
              <div className="size-16 shadow-[0_12px_30px_-8px_oklch(0.623_0.214_259.815/.8)] rounded-2xl bg-[#2b7fff] text-blue-50 flex justify-center items-center">
                <ShieldCheck className="size-8" />
              </div>
              <CardTitle className="font-bold text-zinc-950 text-2xl leading-8 tracking-tight">
                Create Account
              </CardTitle>
              <CardDescription className="text-[#71717b] text-sm leading-5">
                Join us today, it's free!
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    className="font-medium text-zinc-950 text-sm leading-5"
                    htmlFor="fullname"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                    <Input
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="rounded-lg border-zinc-200 border-0 border-solid pl-9 h-11"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    className="font-medium text-zinc-950 text-sm leading-5"
                    htmlFor="email"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-lg border-zinc-200 border-0 border-solid pl-9 h-11"
                      placeholder="you@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    className="font-medium text-zinc-950 text-sm leading-5"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                    <Input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="rounded-lg border-zinc-200 border-0 border-solid px-9 h-11"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="top-1/2 -translate-y-1/2 absolute right-3"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-[#71717b]" />
                      ) : (
                        <Eye className="size-4 text-[#71717b]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    className="font-medium text-zinc-950 text-sm leading-5"
                    htmlFor="confirm"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                    <Input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="rounded-lg border-zinc-200 border-0 border-solid px-9 h-11"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="top-1/2 -translate-y-1/2 absolute right-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4 text-[#71717b]" />
                      ) : (
                        <Eye className="size-4 text-[#71717b]" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="shadow-[0_10px_25px_-8px_oklch(0.623_0.214_259.815/.7)] font-semibold rounded-lg bg-[#2b7fff] text-blue-50 w-full h-11"
                >
                  <UserPlus className="size-4" />
                  {loading ? "Creating Account..." : "Register"}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex  p-0 justify-center items-center gap-1">
              <span className="text-[#71717b] text-sm leading-5">
                Already have an account?
              </span>
              <Link
                className="font-semibold text-[#2b7fff] py-2 text-sm leading-5"
                to="/signin"
              >
                Sign In
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
