"use server"

export async function calculateDistanceAction(
  destination: string,
): Promise<{ distance: number; duration: string; success: boolean; error?: string }> {
  try {
    const origin = "1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181"
    const encodedOrigin = encodeURIComponent(origin)
    const encodedDestination = encodeURIComponent(destination)

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

    if (!apiKey) {
      return { distance: 0, duration: "", success: false, error: "Google Maps API key not configured" }
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}&units=imperial`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "OK" && data.rows[0]?.elements[0]?.status === "OK") {
      const element = data.rows[0].elements[0]
      const distanceValue = element.distance.value // in meters
      const durationText = element.duration.text

      // Convert meters to miles
      const distanceInMiles = distanceValue * 0.000621371

      return {
        distance: Math.round(distanceInMiles * 100) / 100, // Round to 2 decimal places
        duration: durationText,
        success: true,
      }
    } else {
      const errorMessage = data.rows[0]?.elements[0]?.status || data.status || "Unknown error"
      return {
        distance: 0,
        duration: "",
        success: false,
        error: `Google Maps API error: ${errorMessage}`,
      }
    }
  } catch (error) {
    console.error("Distance calculation error:", error)
    return {
      distance: 0,
      duration: "",
      success: false,
      error: "Failed to calculate distance",
    }
  }
}
