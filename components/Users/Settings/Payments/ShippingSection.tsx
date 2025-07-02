"use client";

import * as React from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export function ShippingSection() {
  const [country, setCountry] = React.useState("USA");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const statesUSA = [
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New_Hampshire" },
    { label: "New Jersey", value: "New_Jersey" },
    { label: "New Mexico", value: "New_Mexico" },
    { label: "New York", value: "New_York" },
    { label: "North Carolina", value: "North_Carolina" },
    { label: "North Dakota", value: "North_Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode_Island" },
    { label: "South Carolina", value: "South_Carolina" },
    { label: "South Dakota", value: "South_Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West_Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" },
  ];

  const citiesByState: { [key: string]: string[] } = {
    Alabama: ["Birmingham", "Montgomery", "Mobile"],
    Alaska: ["Anchorage", "Juneau", "Fairbanks"],
    Arizona: ["Phoenix", "Tucson", "Mesa"],
    Arkansas: ["Little Rock", "Fayetteville", "Fort Smith"],
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    Colorado: ["Denver", "Colorado Springs", "Boulder"],
    Connecticut: ["Bridgeport", "Hartford", "New Haven"],
    Delaware: ["Wilmington", "Dover", "Newark"],
    Florida: ["Miami", "Orlando", "Tampa"],
    Georgia: ["Atlanta", "Savannah", "Augusta"],
    Hawaii: ["Honolulu", "Hilo", "Kailua"],
    Idaho: ["Boise", "Idaho Falls", "Meridian"],
    Illinois: ["Chicago", "Springfield", "Peoria"],
    Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
    Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
    Kansas: ["Wichita", "Topeka", "Kansas City"],
    Kentucky: ["Louisville", "Lexington", "Bowling Green"],
    Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
    Maine: ["Portland", "Augusta", "Bangor"],
    Maryland: ["Baltimore", "Annapolis", "Rockville"],
    Massachusetts: ["Boston", "Worcester", "Springfield"],
    Michigan: ["Detroit", "Grand Rapids", "Ann Arbor"],
    Minnesota: ["Minneapolis", "St. Paul", "Rochester"],
    Mississippi: ["Jackson", "Biloxi", "Gulfport"],
    Missouri: ["St. Louis", "Kansas City", "Springfield"],
    Montana: ["Billings", "Missoula", "Bozeman"],
    Nebraska: ["Omaha", "Lincoln", "Bellevue"],
    Nevada: ["Las Vegas", "Reno", "Carson City"],
    New_Hampshire: ["Manchester", "Nashua", "Concord"],
    New_Jersey: ["Newark", "Jersey City", "Trenton"],
    New_Mexico: ["Albuquerque", "Santa Fe", "Las Cruces"],
    New_York: ["New York City", "Buffalo", "Rochester", "Albany"],
    North_Carolina: ["Charlotte", "Raleigh", "Durham"],
    North_Dakota: ["Fargo", "Bismarck", "Grand Forks"],
    Ohio: ["Columbus", "Cleveland", "Cincinnati"],
    Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
    Oregon: ["Portland", "Salem", "Eugene"],
    Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown"],
    Rhode_Island: ["Providence", "Warwick", "Cranston"],
    South_Carolina: ["Columbia", "Charleston", "Greenville"],
    South_Dakota: ["Sioux Falls", "Rapid City", "Aberdeen"],
    Tennessee: ["Nashville", "Memphis", "Knoxville"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
    Utah: ["Salt Lake City", "Provo", "Ogden"],
    Vermont: ["Burlington", "Montpelier", "Rutland"],
    Virginia: ["Richmond", "Virginia Beach", "Norfolk"],
    Washington: ["Seattle", "Spokane", "Tacoma"],
    West_Virginia: ["Charleston", "Huntington", "Morgantown"],
    Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
    Wyoming: ["Cheyenne", "Casper", "Laramie"],
  };

 React.useEffect(() => {
  const fetchShippingAddress = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/account/fetch-shipping-address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch shipping address");

      const res = await response.json();
      const data = res.data;

      setCountry(data.country || "USA");
      setState(data.state || "");
      setZipCode(data.zipCode || ""); // ✅ corrected
      setAddress(data.address || "");

      setTimeout(() => {
        setCity(data.city || "");
      }, 50);
    } catch (error) {
      console.error("Error fetching shipping address:", error);
    }
  };

  fetchShippingAddress();
}, []);


  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/account/add-shipping-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            country,
            state,
            city,
            zip_code: zipCode,
            address,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save address.");
      }

      setSuccessMessage("Shipping address saved successfully.");
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col mt-12 w-full">
      <header className="flex flex-col pb-6 border-b border-gray-300">
        <h3 className="text-xl font-bold mb-2 text-black">Shipping address</h3>
        <p className="mt-1 text-base text-neutral-500">
          Include a pickup location for shipping and delivery. Shipping fees may apply
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full"
      >
        <FormSelect
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={[{ label: "USA", value: "USA" }]}
        />
        <FormSelect
          label="State"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setCity("");
          }}
          options={statesUSA}
          placeholder="Choose state"
        />
        <FormSelect
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={(citiesByState[state] || []).map((cityName) => ({
            label: cityName,
            value: cityName,
          }))}
          placeholder="Choose city"
        />
        <FormInput
          label="Postal Code"
          placeholder="Add postal code"
          value={zipCode}
          onChange={setZipCode}
        />
        <FormInput
          label="Address"
          placeholder="Add address"
          value={address}
          onChange={setAddress}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm col-span-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm col-span-2">{successMessage}</p>
        )}
      </form>

      <div>
        <button
          type="submit"
          className="self-start mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </section>
  );
}
