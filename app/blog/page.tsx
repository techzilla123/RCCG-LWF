"use client"
import { Sparkles } from "lucide-react";
import type React from "react"
import { FooterNewsletter } from "@/components/Footer/FooterNewsletter";
import { useState } from "react"
import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat"
import { Play, Clock, User, Calendar, ArrowLeft, Share2, Heart, ChevronDown, ChevronUp } from "lucide-react"

// Inline UI Components
const Card = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => (
  <div className={`bg-white rounded-lg shadow-md ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const CardTitle = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => (
  <h3 className={`text-xl font-semibold ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
    {children}
  </h3>
)

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  }

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  className?: string
}) => {
  const variants = {
    default: "bg-purple-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  videoUrl?: string
  featured?: boolean
  content?: string
}

const blogPosts: BlogPost[] = [
  {
    id: "balloon-arch-tutorial",
    title: "How to Create a Stunning Balloon Arch in 10 Easy Steps",
    excerpt:
      "Learn the professional techniques to create beautiful balloon arches that will wow your guests. Perfect for birthdays, weddings, and corporate events.",
    category: "Video Tutorial",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/QMW92OyTSQA",
    featured: true,
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Creating a beautiful balloon arch is easier than you think! Whether you're planning a birthday party, wedding, or corporate event, a well-crafted balloon arch can transform any space into something magical.</p>
        
        <div class="bg-purple-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-purple-800">What You'll Need:</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Balloons in your chosen colors (we recommend 50-100 balloons for a standard arch)</li>
            <li>Balloon pump or electric inflator</li>
            <li>Fishing line or balloon decorating strip</li>
            <li>Command hooks or anchor points</li>
            <li>Scissors and balloon sizer</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-gray-800">Step-by-Step Instructions:</h2>
        
        <div class="space-y-4">
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-xl font-semibold mb-2">1. Plan Your Design</h3>
            <p>Before you start inflating balloons, sketch out your arch design. Consider the space, color scheme, and overall theme of your event.</p>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-xl font-semibold mb-2">2. Inflate Your Balloons</h3>
            <p>Inflate balloons to varying sizes for a more organic, professional look. Mix 11-inch, 9-inch, and 5-inch balloons for the best effect.</p>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-xl font-semibold mb-2">3. Create Balloon Clusters</h3>
            <p>Group balloons in clusters of 4-6, tying them together at the base. This creates fuller, more dimensional sections.</p>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-xl font-semibold mb-2">4. Build Your Base Structure</h3>
            <p>Use fishing line or balloon decorating strip as your foundation. This will hold everything together.</p>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-xl font-semibold mb-2">5. Attach Balloon Clusters</h3>
            <p>Secure each cluster to your base structure, working from one end to the other.</p>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-yellow-800">Pro Tips:</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Use a balloon sizer to ensure consistent balloon sizes</li>
            <li>Add greenery or flowers for an elegant touch</li>
            <li>Consider the venue's ceiling height when planning your arch</li>
            <li>Set up the arch as close to event time as possible to prevent deflation</li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    id: "party-planning-checklist",
    title: "Ultimate Party Planning Checklist: Never Forget Anything Again",
    excerpt:
      "A comprehensive checklist covering everything from decorations to cleanup. Download our free printable version!",
    category: "Party Planning",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop",
    featured: true,
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Planning the perfect party can be overwhelming, but with our comprehensive checklist, you'll never miss a detail again!</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-4 text-blue-800">6-8 Weeks Before:</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Set the date and time</li>
              <li>Create guest list</li>
              <li>Choose venue</li>
              <li>Set budget</li>
              <li>Send save-the-dates</li>
            </ul>
          </div>

          <div class="bg-green-50 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-4 text-green-800">4-6 Weeks Before:</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Send formal invitations</li>
              <li>Plan menu and drinks</li>
              <li>Order decorations</li>
              <li>Book entertainment</li>
              <li>Arrange rentals (tables, chairs, etc.)</li>
            </ul>
          </div>

          <div class="bg-yellow-50 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-4 text-yellow-800">2-3 Weeks Before:</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Confirm RSVPs</li>
              <li>Finalize headcount</li>
              <li>Shop for non-perishable items</li>
              <li>Prepare playlist</li>
              <li>Confirm all vendors</li>
            </ul>
          </div>

          <div class="bg-red-50 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-4 text-red-800">Day Of:</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Set up decorations</li>
              <li>Prepare food and drinks</li>
              <li>Set up music/entertainment</li>
              <li>Welcome guests and enjoy!</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-purple-100 p-6 rounded-lg text-center">
          <h3 class="text-xl font-bold mb-2">Download Our Free Checklist!</h3>
          <p class="mb-4">Get our printable party planning checklist delivered to your inbox.</p>
          <button class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Download Now</button>
        </div>
      </div>
    `,
  },
  {
    id: "balloon-bouquet-diy",
    title: "DIY Balloon Bouquets: 5 Creative Designs for Any Occasion",
    excerpt:
      "Step-by-step video guide to creating professional-looking balloon bouquets at home. Includes tips for different themes and color schemes.",
    category: "Video Tutorial",
    author: "Lisa Chen",
    date: "2024-01-10",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Create stunning balloon bouquets that rival professional florists! These 5 designs work for birthdays, anniversaries, graduations, and more.</p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-pink-50 p-4 rounded-lg text-center">
            <h3 class="font-bold text-pink-800">Classic Birthday</h3>
            <p class="text-sm">Bright colors with number balloons</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg text-center">
            <h3 class="font-bold text-blue-800">Elegant Wedding</h3>
            <p class="text-sm">White and gold with pearl accents</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg text-center">
            <h3 class="font-bold text-green-800">Graduation Pride</h3>
            <p class="text-sm">School colors with star balloons</p>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Materials You'll Need:</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <ul class="list-disc list-inside space-y-2">
              <li>Latex balloons (various sizes)</li>
              <li>Foil balloons for accents</li>
              <li>Balloon weights</li>
              <li>Curling ribbon</li>
            </ul>
            <ul class="list-disc list-inside space-y-2">
              <li>Balloon pump</li>
              <li>Scissors</li>
              <li>Double-sided tape</li>
              <li>Decorative elements</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "rental-equipment-guide",
    title: "Complete Guide to Party Rental Equipment: What You Need to Know",
    excerpt:
      "Everything about our rental equipment - from tables and chairs to sound systems and lighting. Make your event planning stress-free!",
    category: "Rentals",
    author: "David Park",
    date: "2024-01-08",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Our comprehensive rental equipment guide helps you choose the perfect items for your event, whether it's an intimate gathering or a large celebration.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Tables & Seating</h3>
            <ul class="space-y-2">
              <li>• Round tables (6-8 people)</li>
              <li>• Rectangular tables (8-10 people)</li>
              <li>• Chiavari chairs</li>
              <li>• Folding chairs</li>
              <li>• Cocktail tables</li>
            </ul>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Audio/Visual</h3>
            <ul class="space-y-2">
              <li>• Sound systems</li>
              <li>• Microphones</li>
              <li>• Projectors</li>
              <li>• Screens</li>
              <li>• Lighting equipment</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4 text-blue-800">Rental Process:</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">1</div>
              <h4 class="font-semibold">Browse & Select</h4>
              <p class="text-sm">Choose from our inventory</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">2</div>
              <h4 class="font-semibold">Get Quote</h4>
              <p class="text-sm">Receive instant pricing</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">3</div>
              <h4 class="font-semibold">Delivery & Setup</h4>
              <p class="text-sm">We handle everything</p>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "seasonal-decorations",
    title: "Seasonal Party Decorations: Transform Your Space for Every Holiday",
    excerpt:
      "Discover how to create magical atmospheres for Halloween, Christmas, Easter, and more with our seasonal decoration ideas.",
    category: "Decorations",
    author: "Emma Wilson",
    date: "2024-01-05",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=800&h=400&fit=crop",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Transform your party space with seasonal decorations that capture the magic of each holiday and season!</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 class="text-xl font-bold mb-4 text-orange-800">🎃 Fall & Halloween</h3>
            <ul class="space-y-2">
              <li>• Pumpkin centerpieces</li>
              <li>• Autumn leaf garlands</li>
              <li>• Orange and black balloons</li>
              <li>• Spooky lighting effects</li>
              <li>• Harvest-themed decorations</li>
            </ul>
          </div>
          
          <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 class="text-xl font-bold mb-4 text-red-800">🎄 Winter & Christmas</h3>
            <ul class="space-y-2">
              <li>• Twinkling string lights</li>
              <li>• Evergreen garlands</li>
              <li>• Red and gold color schemes</li>
              <li>• Snowflake decorations</li>
              <li>• Holiday-themed balloons</li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 class="text-xl font-bold mb-4 text-green-800">🌸 Spring & Easter</h3>
            <ul class="space-y-2">
              <li>• Fresh flower arrangements</li>
              <li>• Pastel color palettes</li>
              <li>• Easter egg decorations</li>
              <li>• Butterfly and bird themes</li>
              <li>• Garden party elements</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 class="text-xl font-bold mb-4 text-yellow-800">☀️ Summer Celebrations</h3>
            <ul class="space-y-2">
              <li>• Tropical themes</li>
              <li>• Bright, vibrant colors</li>
              <li>• Beach and luau decorations</li>
              <li>• Outdoor lighting</li>
              <li>• Pool party accessories</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "balloon-animals-basics",
    title: "Balloon Animals for Beginners: Start with These 3 Easy Designs",
    excerpt:
      "Master the art of balloon twisting with our beginner-friendly video tutorial. Perfect for entertaining kids at parties!",
    category: "Video Tutorial",
    author: "Carlos Martinez",
    date: "2024-01-03",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/Sv3xVOs7_No",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Learn to create adorable balloon animals that will delight kids and adults alike! These three beginner-friendly designs are perfect for getting started.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-blue-800">What You'll Need:</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>260Q modeling balloons (long, thin balloons)</li>
            <li>Hand pump (essential for modeling balloons)</li>
            <li>Permanent markers for details</li>
            <li>Practice and patience!</li>
          </ul>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-green-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-bold mb-3 text-green-800">🐕 The Dog</h3>
            <p class="text-sm">Perfect first balloon animal. Learn basic twists and locks.</p>
          </div>
          <div class="bg-pink-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-bold mb-3 text-pink-800">🗡️ The Sword</h3>
            <p class="text-sm">Simple yet impressive. Great for building confidence.</p>
          </div>
          <div class="bg-yellow-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-bold mb-3 text-yellow-800">🌸 The Flower</h3>
            <p class="text-sm">Beautiful decoration. Teaches advanced techniques.</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "budget-party-tips",
    title: "Throw an Amazing Party on a Budget: 15 Money-Saving Tips",
    excerpt:
      "Create memorable celebrations without breaking the bank. Learn our insider tips for affordable party planning.",
    category: "Party Planning",
    author: "Jennifer Lee",
    date: "2024-01-01",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Who says amazing parties have to cost a fortune? With smart planning and creativity, you can throw unforgettable celebrations on any budget!</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 class="font-bold mb-2">1. Host at Home</h4>
              <p class="text-sm">Skip venue fees by using your backyard or living room</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 class="font-bold mb-2">2. DIY Decorations</h4>
              <p class="text-sm">Create stunning decor with balloons and craft supplies</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 class="font-bold mb-2">3. Potluck Style</h4>
              <p class="text-sm">Ask guests to bring dishes to share</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
              <h4 class="font-bold mb-2">4. Digital Invitations</h4>
              <p class="text-sm">Save on printing with beautiful online invites</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 class="font-bold mb-2">5. Create Playlists</h4>
              <p class="text-sm">Skip DJ fees with streaming music</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 class="font-bold mb-2">6. Shop Sales</h4>
              <p class="text-sm">Buy decorations after holidays at discount</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Budget Breakdown Template:</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">30%</div>
              <p class="font-semibold">Decorations</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">50%</div>
              <p class="font-semibold">Food & Drinks</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">20%</div>
              <p class="font-semibold">Entertainment</p>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "corporate-event-styling",
    title: "Corporate Event Styling: Professional Decorations That Impress",
    excerpt:
      "Elevate your business events with sophisticated decoration ideas that reflect your brand and impress clients.",
    category: "Corporate Events",
    author: "Robert Kim",
    date: "2023-12-28",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Corporate events require a sophisticated touch that reflects your brand while creating memorable experiences for clients and employees.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Event Types</h3>
            <ul class="space-y-2">
              <li>• Annual holiday parties</li>
              <li>• Product launch events</li>
              <li>• Client appreciation dinners</li>
              <li>• Team building celebrations</li>
              <li>• Award ceremonies</li>
            </ul>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Professional Elements</h3>
            <ul class="space-y-2">
              <li>• Brand color coordination</li>
              <li>• Elegant centerpieces</li>
              <li>• Professional lighting</li>
              <li>• Custom signage</li>
              <li>• Quality linens and tableware</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4 text-blue-800">Planning Timeline:</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</div>
              <div>
                <h4 class="font-semibold">8 weeks: Set objectives and budget</h4>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
              <div>
                <h4 class="font-semibold">6 weeks: Design theme and branding</h4>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 class="font-semibold">4 weeks: Book services and rentals</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },
]

const categories = ["All", "Video Tutorial", "Party Planning", "Rentals", "Decorations", "Corporate Events"]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const togglePostExpansion = (postId: string) => {
    const newExpanded = new Set(expandedPosts)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedPosts(newExpanded)
  }

  if (selectedPost) {
    return (
      <>
        <Offer />
        <TopNavBar />
        <article className="py-16 bg-stone-50">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{selectedPost.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPost.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Video Embed (if applicable) */}
            {selectedPost.videoUrl && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Watch the Tutorial</h3>
                  <div className="aspect-video">
                    <iframe
                      src={selectedPost.videoUrl}
                      title={selectedPost.title}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Content */}
            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.excerpt }}
                />
              </CardContent>
            </Card>

            {/* Related Posts */}
            <section className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts
                  .filter((post) => post.id !== selectedPost.id && post.category === selectedPost.category)
                  .slice(0, 2)
                  .map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-6">
                        <Badge className="mb-2">{post.category}</Badge>
                        <h4 className="text-lg font-semibold mb-2 hover:text-purple-600">{post.title}</h4>
                        <p className="text-gray-600 text-sm">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          </div>
        </article>
        <BotpressChat />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Offer />
      <TopNavBar />

      {/* Hero Section */}
     <section className="relative overflow-hidden bg-purple-600 text-white py-16 rounded-lg shadow-md">
  {/* Decorative Sparkles */}
  <div className="absolute inset-0 z-0 pointer-events-none opacity-10 animate-pulse">
    <div className="grid grid-cols-8 gap-6 w-full h-full">
      {[...Array(48)].map((_, i) => (
        <Sparkles key={i} className="w-5 h-5 mx-auto my-auto text-white" />
      ))}
    </div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 container mx-auto px-4 text-center">
    <h1 className="text-5xl font-bold mb-4">Party Place & Rentals Blog</h1>
    <p className="text-xl mb-8">
      Your ultimate guide to amazing parties, balloon artistry, and event planning
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
        🎈 Balloon Tutorials
      </Badge>
      <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
        🎉 Party Planning
      </Badge>
      <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
        🏢 Event Rentals
      </Badge>
    </div>
  </div>
</section>

      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Posts */}
          {selectedCategory === "All" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Featured Content</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 object-cover cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                      />
                      {post.videoUrl && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer"
                          onClick={() => setSelectedPost(post)}
                        >
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4">{post.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle
                        className="text-xl hover:text-purple-600 transition-colors"
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Expandable Content Preview */}
                      {post.content && (
                        <div className="border-t pt-4">
                          <button
                            onClick={() => togglePostExpansion(post.id)}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            {expandedPosts.has(post.id) ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                Read Preview
                              </>
                            )}
                          </button>

                          {expandedPosts.has(post.id) && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              {post.videoUrl && (
                                <div className="mb-4">
                                  <div className="aspect-video">
                                    <iframe
                                      src={post.videoUrl}
                                      title={post.title}
                                      className="w-full h-full rounded-lg"
                                      allowFullScreen
                                    />
                                  </div>
                                </div>
                              )}
                              <div
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                              />
                              <Button className="mt-4" onClick={() => setSelectedPost(post)}>
                                Read Full Article
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  />
                  {post.videoUrl && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                    >
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle
                    className="text-lg hover:text-purple-600 transition-colors"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
         
<div className="mt-16 relative bg-gray-600 text-white rounded-lg p-8 text-center overflow-hidden shadow-md">
  {/* Decorative Stars */}
  <div className="absolute inset-0 pointer-events-none animate-pulse opacity-20">
    <div className="grid grid-cols-6 gap-4 w-full h-full">
      {[...Array(36)].map((_, i) => (
        <Sparkles key={i} className="w-4 h-4 text-white mx-auto my-auto opacity-50" />
      ))}
    </div>
  </div>

  {/* Main Content */}
  <div className="relative z-10">
    <h3 className="text-2xl font-bold mb-4">Never Miss a Tutorial!</h3>
    <p className="mb-6">
      Subscribe to get the latest balloon tutorials, party tips, and exclusive content delivered to your inbox.
    </p>
    <div className="flex max-w-md mx-auto gap-4">
      <FooterNewsletter />
    </div>
  </div>
</div>
        </div>
      </section>

      <BotpressChat />
      <Footer />
    </>
  )
}
