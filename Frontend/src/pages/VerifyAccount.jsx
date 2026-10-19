import React, { useState, useRef } from "react";
import { ArrowLeft, Info, MailCheck, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "@/utils/axios";
export default function VerifyAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      return toast.error("Please enter 6 digit verification code");
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/verify-account", {
        code: verificationCode,
      });
      if (data.success) {
        toast.success(data.message || "Account Verified!");
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit min-h-screen  min-w-screen max-w-screen overflow-visible">
        <div className="relative bg-[linear-gradient(135deg,#0A1628_0%,#13294B_50%,#1E3A8A_100%)] flex justify-center items-center w-full h-239 overflow-hidden">
          <Card className="relative z-10 backdrop-blur-xl shadow-[0_8px_60px_rgba(37,99,235,0.35)] rounded-3xl bg-white/90 border-white/40 border-1 border-solid p-8 gap-6 w-120">
            <CardHeader className="p-0 gap-6">
              <button
                className="font-medium text-[#2b7fff] text-sm leading-5 flex items-center gap-2 w-fit cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <ArrowLeft className="size-4" />
                <span>Back to Register</span>
              </button>

              <div className="flex flex-col items-center gap-6">
                <div className="relative flex justify-center items-center">
                  <span className="size-24 animate-ping rounded-full border-[#2b7fff]/30 border-2 border-solid absolute" />
                  <span className="size-24 rounded-full border-[#2b7fff]/40 border-1 border-solid absolute" />

                  <div className="relative size-20 shadow-[0_0_30px_rgba(37,99,235,0.6)] rounded-full bg-[#2b7fff] flex justify-center items-center">
                    <MailCheck className="size-10 text-blue-50" />
                  </div>
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                  <h1 className="font-bold text-zinc-950 text-2xl leading-8">
                    Verify Your Email
                  </h1>
                  <p className="leading-relaxed max-w-sm text-[#71717b] text-sm">
                    We've sent a 6-digit verification code
                    {email ? ` to ${email}` : " to your email address"}. Please
                    check your inbox.
                  </p>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="flex p-0 flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className={`size-14 outline-none font-bold text-center rounded-xl bg-white text-zinc-950 text-xl leading-7 border-2 border-solid ${
                        digit
                          ? "shadow-[0_0_12px_rgba(37,99,235,0.4)] border-[#2b7fff]"
                          : "border-zinc-200"
                      }`}
                      maxLength={"1"}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="shadow-[0_6px_20px_rgba(37,99,235,0.4)] font-bold rounded-xl bg-[#2b7fff] text-blue-50 text-base leading-6 w-full h-12"
                >
                  <ShieldCheck className="size-5" />
                  {loading ? "Verifying..." : "Verify Account"}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-0 pt-2 pb-0 justify-center items-center gap-2">
              <div className="text-[#71717b] text-sm leading-5 flex pt-4 mb-8 items-center gap-2">
                <Info className="size-4" />
                <span>Didn't receive the email? Check your spam folder.</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

