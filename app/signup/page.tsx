"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
]

export default function SignUpPage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const router = useRouter()
  const supabase = createClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            country_code: selectedCountryCode,
          },
        },
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({
          type: "success",
          text: "Account created successfully! Please check your email to verify your account.",
        })
        // Redirect to dashboard after successful signup
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setMessage({ type: "error", text: error.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to sign in with Google" })
    }
  }

  return (
    <div
      className="min-h-screen font-['Onest',sans-serif] flex items-center justify-center p-4"
      style={{ backgroundColor: "#F4F2ED" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Close button */}
          <Link href="/" className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </Link>

          {/* Message display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create an account</h2>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus:bg-white focus:border-gray-300 transition-colors"
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus:bg-white focus:border-gray-300 transition-colors"
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12 pl-12 pr-4 focus:bg-white focus:border-gray-300 transition-colors"
                  required
                />
              </div>

              {/* Phone field */}
              <div className="flex gap-2">
                <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
                  <SelectTrigger className="w-20 bg-gray-50 border-gray-200 rounded-xl h-12 focus:bg-white focus:border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center space-x-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus:bg-white focus:border-gray-300 transition-colors"
                />
              </div>

              {/* Password fields */}
              <Input
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus:bg-white focus:border-gray-300 transition-colors"
                required
                minLength={6}
              />

              <Input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus:bg-white focus:border-gray-300 transition-colors"
                required
                minLength={6}
              />

              {/* Create account button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-white font-medium rounded-xl hover:opacity-90 transition-opacity mt-6"
                style={{ backgroundColor: "#FA9937" }}
              >
                {loading ? "Creating Account..." : "Create an account"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR SIGN UP WITH</span>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
                  disabled
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-gray-700 hover:underline">
                  Terms & Service
                </Link>
              </p>
            </form>
          </>
        </div>
      </div>
    </div>
  )
}
