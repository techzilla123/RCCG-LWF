"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Check } from "lucide-react"

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [birthday, setBirthday] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  const [isGenderOpen, setIsGenderOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken")
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

      try {
        const res = await fetch(`${baseUrl}customer/account/profile-details`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        })

        const result = await res.json()
        const data = result.data

        setFirstName(data.firstname || "")
        setLastName(data.lastname || "")
        setEmail(data.email || "")
        setPhone(data.phoneNumber || "")
        setGender(data.gender || "")
        setBirthday(data.birthday || "")
        setCountry(data.country || "")
        setCity(data.city || "")
        setAddress(data.address || "")
        setProfileImage(data.profile_picture || "")
      } catch (err) {
        console.error("Error fetching profile:", err)
      }
    }

    fetchProfile()
  }, [])

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setImageFile(file)
    }
  }

  // Save profile
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("accessToken")
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    const formData = new FormData()
    formData.append("firstname", firstName)
    formData.append("lastname", lastName)
    formData.append("email", email)
    formData.append("phone_number", phone)
    formData.append("gender", gender)
    formData.append("birthday", birthday)
    formData.append("country", country)
    formData.append("city", city)
    formData.append("address", address)

  if (imageFile) {
  formData.append("profile_picture", imageFile) // instead of "file"
}


    try {
      const res = await fetch(`${baseUrl}customer/account/update-profile`, {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token || "",
        },
        body: formData,
      })

      const result = await res.json()
      if (result.statusCode === 200) {
        alert("Profile updated successfully!")
      } else {
        alert("Update failed. Please try again.")
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("Something went wrong. Try again.")
    }
  }

  return (
    <div className="bg-white w-full min-h-screen py-12">
      <div className="max-w-3xl bg-white mx-auto">
        <form onSubmit={handleSaveChanges}>
          {/* Profile Picture */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-black">Profile picture</h3>
            <div className="flex items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mr-4">
                {profileImage ? (
  <Image
    src={profileImage}
    alt="Profile"
    fill
    style={{ objectFit: "cover" }}
  />
) : (
  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
    {firstName.charAt(0).toUpperCase()}
    {lastName.charAt(0).toUpperCase()}
  </div>
)}

              </div>
              <div>
                <label
                  htmlFor="upload-image"
                  className="text-blue-500 font-medium cursor-pointer hover:underline"
                >
                  Upload image
                </label>
                <input
                  id="upload-image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-gray-500 text-sm mt-1">
                  Image must be .jpg, .png or .gif file with 10MB max size
                </p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-black">Personal information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="first-name" className="block mb-2 text-black">
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last-name" className="block mb-2 text-black">
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-black">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block mb-2 text-black">
                  Phone
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-white">
                    <span className="flex items-center">
                      <span className="w-6 h-4 block rounded-sm overflow-hidden mr-1">
                        {/* 🇺🇸 Flag SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" className="w-full h-full">
                          <rect width="7410" height="3900" fill="#b22234" />
                          <path
                            d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
                            stroke="#fff"
                            strokeWidth="300"
                          />
                          <rect width="2964" height="2100" fill="#3c3b6e" />
                        </svg>
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 - Add phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block mb-2 text-black">Gender</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-black"
                  >
                    {gender || "Select gender"}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  {isGenderOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setGender(option)
                            setIsGenderOpen(false)
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                        >
                          {option}
                          {gender === option && <Check className="h-4 w-4 text-blue-500" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Birthday */}
              <div>
                <label htmlFor="birthday" className="block mb-2 text-black">Birthday</label>
                <input
                  id="birthday"
                  type="text"
                  placeholder="Pick a date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text"
                  }}
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-black">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div>
                <label htmlFor="country" className="block mb-2 text-black">Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-black"
                  >
                    {country || "Choose country"}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  {isCountryOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {[
                        "United States",
                        "Canada",
                        "United Kingdom",
                        "Australia",
                        "Germany",
                        "France",
                        "Japan",
                        "China",
                        "India",
                      ].map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setCountry(option)
                            setIsCountryOpen(false)
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                        >
                          {option}
                          {country === option && <Check className="h-4 w-4 text-blue-500" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block mb-2 text-black">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Add city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block mb-2 text-black">Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Add address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  )
}
