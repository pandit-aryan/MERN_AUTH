import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/utils/axios";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const { data } = await axiosInstance.post("/auth/signin", formData);

      if (data.success) {
        toast.success(data.message || "Signed in successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex w-full h-239 overflow-hidden">
          <div className="relative w-1/2 bg-[linear-gradient(145deg,#1E3A8A_0%,#2563EB_100%)] h-full overflow-hidden">
            <div className="relative z-10 flex p-12 flex-col justify-between h-full">
              <div className="text-white flex items-center gap-2">
                <div className="size-9 backdrop-blur-sm rounded-xl bg-white/15 flex justify-center items-center">
                  <ShieldCheck className="size-5 text-white" />
                </div>
                <span className="font-semibold text-lg leading-7 tracking-tight">
                  AuthFlow
                </span>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="relative size-72 backdrop-blur-md ring-1 ring-white/20 rounded-3xl bg-white/10 flex justify-center items-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1610188659889-bad8d8eef657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHwzRCUyMGFic3RyYWN0JTIwc2VjdXJlJTIwbG9jayUyMHNoaWVsZCUyMGJsdWUlMjByZW5kZXJ8ZW58MXwxfHx8MTc4MDIyMDgyMXww&ixlib=rb-4.1.0&q=80&w=400"
                    alt="3D secure lock"
                    className="object-cover w-full h-full"
                  />
                  <div className="bg-[linear-gradient(160deg,transparent_40%,oklch(0.42_0.18_264/.55))] absolute inset-0" />
                </div>
              </div>

              <div className="text-white flex flex-col gap-2">
                <h1 className="font-bold text-4xl leading-10 tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-white/70 text-base leading-6">
                  Sign in to continue your journey.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-1/2 bg-white h-full">
            <div className="bg-[#2b7fff] absolute inset-x-0 top-0 h-1" />

            <div className="flex px-12 flex-col justify-center h-full">
              <div className="max-w-md mx-auto w-full">
                <div className="flex mb-8 items-center gap-2">
                  <div className="size-9 rounded-xl bg-[#2b7fff] flex justify-center items-center">
                    <Lock className="size-5 text-blue-50" />
                  </div>
                  <span className="font-semibold text-zinc-950 text-lg leading-7 tracking-tight">
                    AuthFlow
                  </span>
                </div>

                <div className="flex mb-8 flex-col gap-2">
                  <h2 className="font-bold text-zinc-950 text-3xl leading-9 tracking-tight">
                    Sign In
                  </h2>
                  <p className="text-[#71717b] text-sm leading-5">
                    Enter your credentials to access your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="font-medium text-zinc-950 text-sm leading-5"
                    >
                      Email Address
                    </Label>

                    <div className="relative">
                      <Mail className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="password"
                      className="font-medium text-zinc-950 text-sm leading-5"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <Lock className="top-1/2 -translate-y-1/2 size-4 text-[#71717b] absolute left-3" />
                      <Input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="px-10 h-11"
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

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label
                        htmlFor="remember"
                        className="font-normal text-[#71717b] text-sm leading-5"
                      >
                        Remember Me
                      </Label>
                    </div>

                    <Link
                      to="/forgot-password"
                      className="font-medium text-[#2b7fff] text-sm leading-5"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="font-semibold bg-[#2b7fff] text-blue-50 w-full h-11"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>

                  <p className="text-center text-[#71717b] text-sm leading-5">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-[#2b7fff]">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




