import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (res.ok) {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect to home page
        navigate("/menu");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center pt-8 text-sm text-zinc-600 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        {/* Login Form */}
        <div className="mx-auto max-w-md space-y-6 pt-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-zinc-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Error message */}
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-zinc-900 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;