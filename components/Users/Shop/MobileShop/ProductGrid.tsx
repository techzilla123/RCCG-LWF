"use client";
import React from 'react';

import { ProductCardM } from './ProductCard';
import { Product } from './types';

const product: Product[] = [
  {
    id: "1",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/948f4a6a19e69738c6057a865f9e8f1f44168c57",
    title: "Happy Vibes Only Birthday Tableware Set – Plates...",
    price: 40000,
  },
  {
    id: "2",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/726d955dd15eb3d8b66dad2010bc1f252f4d1c65",
    title: "Transparent Bubble Balloon with Custom Sti...",
    price: 40000,
  },
  {
    id: "3",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d70f24a76c4b53dc3233bb0d5aeadf3ad0b3ab1",
    title: "Elegant Golden Age Birthday Celebration Se...",
    price: 40000,
  },
  {
    id: "4",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/68619c7d3c9c0546c0b34766893d90158df5b9b1",
    title: "All-In-One Happy Birthday Bash Décor Kit...",
    price: 40000,
    isOutOfStock: true,
    isWishlisted: true,
  },
  {
    id: "5",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4a6281bc679969d39037abfcfc6fa5413390f8a",
    title: "Deluxe Dessert Station Setup Kit – For Insta...",
    price: 40000,
  },
  {
    id: "6",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/28916243644982d224d803ba81eda68988bd2f3f",
    title: "Sparkle & Shine Birthday Cake Topper Set with...",
    price: 40000,
  },
  {
    id: "7",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3838b00a55cd260c2ce9ed61967ecc658073f3b9",
    title: "Transparent Bubble Balloon with Custom Sti...",
    price: 40000,
  },
  {
    id: "8",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/284d4b21df4e561ab5df244dc8a3a7f8fd624f9c",
    title: "Magical Number Celebration Balloon Kit...",
    price: 40000,
  },
  {
    id: "9",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c965ea55f330446dce96562586e6621ef49b0333",
    title: "Sweet Treats Birthday Table Display Set Confe...",
    price: 40000,
    isOutOfStock: true,
  },
  {
    id: "10",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c75c122f6b021031492351ec89948d4cc9d09ff6",
    title: "Boho Bliss Birthday Accessory Kit with Stre...",
    price: 40000,
    isWishlisted: true,
  },
  {
    id: "11",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/33214ae94b162cb31e429a41b9a00f49f2a61ca3",
    title: "Color Explosion Birthday Party Decoration Meg...",
    price: 40000,
  },
  {
    id: "12",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a541194ddba30f05cd9dc2e23615535b627888fd",
    title: "Royal Celebration Birthday Décor Box – F...",
    price: 40000,
  },
];

export const ProductGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
      {product.map((product) => (
        <React.Fragment key={product.id}>
          <ProductCardM product={product} />
        </React.Fragment>
      ))}
    </section>
  );
};

