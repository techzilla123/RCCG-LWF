"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Check } from "lucide-react"

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("johndoe@email.com")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("Male")
  const [birthday, setBirthday] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [isGenderOpen, setIsGenderOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      profileImage,
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthday,
      country,
      city,
      address,
    })
  }

  return (
    <div className="bg-white w-full min-h-screen py-12"> 
    <div className="max-w-3xl bg-white mx-auto ">
      <form onSubmit={handleSaveChanges}>
        {/* Profile Picture */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2" style={{color: "#000000"}}>Profile picture</h3>
          <div className="flex items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mr-4">
              {profileImage ? (
                <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill style={{ objectFit: "cover" }} />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <img
                    src="/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg"
                    alt="Default Profile"
                    width={96}
                    height={96}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="upload-image" className="text-blue-500 font-medium cursor-pointer hover:underline">
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
                Image must be either .jpg, .png or .gif file with 10MB maximum size
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{color: "#000000"}}>Personal information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="first-name " className="text-black block mb-2">
                First name
              </label>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="text-black block mb-2">
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" className="w-full h-full">
                        <rect width="7410" height="3900" fill="#b22234" />
                        <path
                          d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
                          stroke="#fff"
                          strokeWidth="300"
                        />
                        <rect width="2964" height="2100" fill="#3c3b6e" />
                        <g fill="#fff">
                          <g id="s18">
                            <g id="s9">
                              <g id="s5">
                                <g id="s4">
                                  <path
                                    id="s"
                                    d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
                                  />
                                  <use href="#s" y="420" />
                                  <use href="#s" y="840" />
                                  <use href="#s" y="1260" />
                                </g>
                                <use href="#s" y="1680" />
                              </g>
                              <use href="#s4" x="247" y="210" />
                            </g>
                            <use href="#s9" x="494" />
                          </g>
                          <use href="#s18" x="988" />
                          <use href="#s9" x="1976" />
                          <use href="#s5" x="2470" />
                        </g>
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
              <label htmlFor="gender" className="block mb-2 text-black">
                Gender
              </label>
              <div className="relative">
  <button
    type="button"
    onClick={() => setIsGenderOpen(!isGenderOpen)}
    className={`w-full px-4 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${
      gender ? "text-black" : "text-gray-400"
    }`}
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
            setGender(option);
            setIsGenderOpen(false);
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
              <label htmlFor="birthday" className="block mb-2 text-black">
                Birthday
              </label>
              <div className="relative">
  <input
    id="birthday"
    type="text"
    placeholder="Pick a date"
    value={birthday}
    onChange={(e) => setBirthday(e.target.value)}
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => {
      if (!e.target.value) e.target.type = "text";
    }}
    className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{color: "#000000"}}>Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <label htmlFor="country" className="block mb-2 text-black">
                Country
              </label>
              <div className="relative ">
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-full px-4 py-2  text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-black"
                >
                  {country || "Choose country"}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                {isCountryOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white  border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
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
              <label htmlFor="city" className="block mb-2 text-black">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Add city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block mb-2 text-black">
                Address
              </label>
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
