"use client"

import * as React from "react"
import OfferImages from "./Offers/OfferImages"

const Offers: React.FC = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[360px] bg-yellow-400">
      <OfferImages
        firstImageUrl="/untitled.svg"
        secondImageUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4828825885b07851dceda276ef48021429ee70e6?placeholderIfAbsent=true"
      />
    </section>
  )
}

export default Offers
