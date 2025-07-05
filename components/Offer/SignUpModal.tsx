"use client"

import * as React from "react"
import { FaLock, FaEnvelope } from "react-icons/fa6"
import type { GoogleCredentialResponse } from "./google-auth"

interface SignUpModalProps {
  onClose: () => void
  onOpenLogin: () => void
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onOpenLogin }) => {
  const [firstname, setFirstname] = React.useState("")
  const [lastname, setLastname] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [code, setCode] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [loadingVerify, setLoadingVerify] = React.useState(false)
  const [loadingResend, setLoadingResend] = React.useState(false)
  const [loadingGoogle, setLoadingGoogle] = React.useState(false)
  const [step, setStep] = React.useState<"signup" | "verify" | "google-password">("signup")
  const [googleUser, setGoogleUser] = React.useState<{
    email: string
    given_name: string
    family_name: string
    picture?: string
    sub: string
  } | null>(null)
  const [error, setError] = React.useState("")
  const googleButtonRef = React.useRef<HTMLDivElement>(null)

  
  const getInitials = (user: {
    email: string
    given_name: string
    family_name: string
    picture?: string
    sub: string
  }): string => {
    const first = user.given_name?.charAt(0) || ""
    const last = user.family_name?.charAt(0) || ""
    return first + last
  }
  // Load Google OAuth script
  React.useEffect(() => {
    const loadGoogleScript = (): void => {
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        initializeGoogleAuth()
        return
      }
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogleAuth
      document.head.appendChild(script)
    }

    const initializeGoogleAuth = (): void => {
      if (window.google?.accounts && googleButtonRef.current) {
        try {
          const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          if (!clientId) {
            console.error("Google Client ID not found")
            setError("Google sign-in configuration error")
            return
          }

          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          })

          // Render the Google button
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "continue_with",
            shape: "pill",
          })
        } catch (error) {
          console.error("Google Auth initialization error:", error)
          setError("Failed to initialize Google sign-in")
        }
      }
    }

    if (step === "signup") {
      loadGoogleScript()
    }
  }, [step])

  const handleGoogleResponse = async (response: GoogleCredentialResponse): Promise<void> => {
    try {
      setLoadingGoogle(true)
      setError("")
      if (!response.credential) {
        throw new Error("No credential received from Google")
      }

      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split(".")[1]))
      const googleUserData = {
        email: payload.email,
        given_name: payload.given_name || "",
        family_name: payload.family_name || "",
        picture: payload.picture,
        sub: payload.sub,
      }

      setGoogleUser(googleUserData)
      setEmail(googleUserData.email)
      setFirstname(googleUserData.given_name)
      setLastname(googleUserData.family_name)
      setStep("google-password")
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError("Google sign-in failed. Please try again.")
    } finally {
      setLoadingGoogle(false)
    }
  }

  const handleGooglePasswordSubmit = async (): Promise<void> => {
    if (!googleUser || !password) {
      setError("Password is required")
      return
    }

    setLoading(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const res = await fetch(`${apiBaseUrl}create-customer-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
        body: JSON.stringify({
          firstname: googleUser.given_name,
          lastname: googleUser.family_name,
          email: googleUser.email,
          password: password,
          google_id: googleUser.sub,
          profile_picture: googleUser.picture,
          auth_provider: "google",
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Signup failed")
      setStep("verify")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const res = await fetch(`${apiBaseUrl}create-customer-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Signup failed")
      setStep("verify")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (): Promise<void> => {
    setLoadingVerify(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const res = await fetch(`${apiBaseUrl}verify-customer-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
        body: JSON.stringify({
          code,
          email_address: email,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Verification failed")
      alert("Account Verified Successfully!")
      onClose()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoadingVerify(false)
    }
  }

  const handleResendCode = async (): Promise<void> => {
    setLoadingResend(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const res = await fetch(`${apiBaseUrl}regenerate-registration-otp/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Resend failed")
      alert("Verification code resent to your email.")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoadingResend(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition text-2xl"
            onClick={onClose}
          >
            ✕
          </button>

          {step === "signup" ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black/80">Sign up</h2>
              <p className="text-center text-gray-500 text-sm mb-6">
                Great start! Create your account to get better shopping experience
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {/* Google Sign-in Button Container */}
                <div ref={googleButtonRef} className="w-full flex justify-center"></div>
                {loadingGoogle && <div className="text-center text-sm text-gray-500">Connecting to Google...</div>}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="text-gray-400 text-xs">OR</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="flex-1 min-w-0 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="flex-1 min-w-0 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="p-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition"
                >
                  {loading ? "Creating..." : "Create account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <button type="button" onClick={onOpenLogin} className="text-blue-600 hover:underline">
                  Log in
                </button>
              </p>
            </>
          ) : step === "google-password" ? (
            <>
              <h2 className="text-xl font-semibold text-center mb-4 text-black">Set Your Password</h2>
              <p className="text-center text-gray-600 text-sm mb-6">
                For security reasons, please set a password for your account
              </p>

              {googleUser && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(googleUser)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {googleUser.given_name} {googleUser.family_name}
                    </p>
                    <p className="text-gray-500 text-xs">{googleUser.email}</p>
                  </div>
                </div>
              )}

              <div className="relative mb-4">
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>

              {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

              <button
                type="button"
                onClick={handleGooglePasswordSubmit}
                disabled={loading || !password}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Complete Sign Up"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center mb-4 text-black">Account created successfully!</h2>
              <p className="text-center text-gray-600 text-sm mb-4">
                Kindly enter the verification code sent to <strong>{email}</strong>
              </p>

              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm mb-4"
              />

              {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

              <div className="flex justify-between items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loadingResend}
                  className="p-3 bg-gray-400 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition"
                >
                  {loadingResend ? "Resending..." : "Resend code"}
                </button>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={loadingVerify}
                  className="p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition"
                >
                  {loadingVerify ? "Verifying..." : "Verify Email"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
