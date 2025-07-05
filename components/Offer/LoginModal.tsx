"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { FaLock, FaEnvelope } from "react-icons/fa6"
import { ForgotPasswordModal } from "./ForgotPasswordModal"
import type { GoogleCredentialResponse } from "./google-auth"

interface LoginModalProps {
  onClose: () => void
  onOpenSignUp: () => void
  onLoginSuccess?: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onOpenSignUp, onLoginSuccess }) => {
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [step, setStep] = useState<"login" | "google-password">("login")
  const [googleUser, setGoogleUser] = useState<{
    email: string
    given_name: string
    family_name: string
    picture?: string
    sub: string
  } | null>(null)
  const [error, setError] = useState("")
  const googleButtonRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
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
      if (window.google?.accounts && googleButtonRef.current && step === "login") {
        try {
          // Clear any existing content
          googleButtonRef.current.innerHTML = ""

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

    // Clear Google button when not on login step
    if (step !== "login" && googleButtonRef.current) {
      googleButtonRef.current.innerHTML = ""
    }

    if (step === "login") {
      loadGoogleScript()
    }

    // Cleanup function
    return () => {
      if (googleButtonRef.current) {
        googleButtonRef.current.innerHTML = ""
      }
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
      setStep("google-password")
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError("Google sign-in failed. Please try again.")
    } finally {
      setLoadingGoogle(false)
    }
  }

  const handleGoogleLogin = async (): Promise<void> => {
    if (!googleUser || !password) {
      setError("Password is required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const response = await fetch(`${apiBaseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
        body: JSON.stringify({
          email: googleUser.email,
          password: password,
          google_id: googleUser.sub,
          auth_provider: "google",
        }),
      })

      if (!response.ok) {
        throw new Error("Login failed, please try again.")
      }

      const result = await response.json()
      const token = `Bearer ${result.data.token}`

      // Save token
      localStorage.setItem("accessToken", token)

      // Save user data
      const userData = result.data.data
      localStorage.setItem("firstname", userData.firstname)
      localStorage.setItem("lastname", userData.lastname)
      localStorage.setItem("userId", userData.userId)
      localStorage.setItem("email", userData.email)

      // Trigger success callback or close modal
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        onClose()
      }
    } catch (error) {
      console.error("Error during Google login:", error)
      setError("Login failed, please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

      if (!apiBaseUrl || !secretKey) {
        throw new Error("API configuration missing")
      }

      const response = await fetch(`${apiBaseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretKey,
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed, please try again.")
      }

      const result = await response.json()
      const token = `Bearer ${result.data.token}`

      // Save token
      localStorage.setItem("accessToken", token)

      // Save user data
      const userData = result.data.data
      localStorage.setItem("firstname", userData.firstname)
      localStorage.setItem("lastname", userData.lastname)
      localStorage.setItem("userId", userData.userId)
      localStorage.setItem("email", userData.email)

      // Trigger success callback or close modal
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        onClose()
      }
    } catch (error) {
      console.error("Error during login:", error)
      setError("Login failed, please try again.")
    } finally {
      setIsLoading(false)
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

          {step === "login" ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black/80">Login</h2>
              <p className="text-center text-gray-500 text-sm mb-6">
                Welcome back! Login to continue your shopping adventure
              </p>

              {step === "login" && (
                <div className="flex flex-col gap-3 mb-6">
                  <div ref={googleButtonRef} className="w-full flex justify-center"></div>
                  {loadingGoogle && <div className="text-center text-sm text-gray-500">Connecting to Google...</div>}
                </div>
              )}

              <div className="flex items-center gap-2 mb-6">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="text-gray-400 text-xs">OR</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`p-3 mt-2 ${
                    isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded-full text-sm font-semibold transition`}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                <span>
                  {"Don't have an account? "}
                  <button type="button" onClick={onOpenSignUp} className="text-blue-600 hover:underline">
                    Create one
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-blue-600 hover:underline"
                >
                  Forgot password
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center mb-4 text-black">Enter Your Password</h2>
              <p className="text-center text-gray-600 text-sm mb-6">
                Please enter your password to continue with Google login
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>

              {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading || !password}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Continue Login"}
              </button>

              <button
                type="button"
                onClick={() => setStep("login")}
                className="w-full p-2 mt-2 text-gray-600 hover:text-black text-sm transition"
              >
                Back to login
              </button>
            </>
          )}

          {showForgotModal && <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />}
        </div>
      </div>
    </div>
  )
}
