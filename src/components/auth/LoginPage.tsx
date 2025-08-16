import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/use-auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isOnboardingCompleted } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save auth state using context
      login(formData.email);
      
      // Navigate based on onboarding status
      if (isOnboardingCompleted) {
        navigate("/home");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      setErrors({ general: "Đăng nhập thất bại. Vui lòng thử lại." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#ff8c94]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#32201c] mb-2">Chào mừng trở lại!</h1>
            <p className="text-[#32201c]/70">Đăng nhập để tiếp tục sử dụng Kitchenly</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#32201c] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff8c94] w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 border-2 ${errors.email ? 'border-red-300' : 'border-[#ff8c94]/30'} focus:border-[#ff8c94]`}
                  placeholder="Nhập email của bạn"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#32201c] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff8c94] w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pl-10 pr-10 border-2 ${errors.password ? 'border-red-300' : 'border-[#ff8c94]/30'} focus:border-[#ff8c94]`}
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ff8c94]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-[#ff8c94] hover:underline text-sm">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#ff8c94] hover:bg-[#f07784] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-[#ff8c94]/20"></div>
            <span className="px-4 text-sm text-[#32201c]/70">hoặc</span>
            <div className="flex-1 border-t border-[#ff8c94]/20"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-[#ff8c94]/30 text-[#32201c] hover:bg-[#ff8c94]/10"
            >
              Đăng nhập với Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-[#ff8c94]/30 text-[#32201c] hover:bg-[#ff8c94]/10"
            >
              Đăng nhập với Facebook
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-[#32201c]/70">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-[#ff8c94] hover:underline font-semibold">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
