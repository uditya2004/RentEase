"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, TrendingUp, Briefcase, ShieldCheck } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const metrics = [
  {
    title: "Total Revenue",
    value: "$1,234,567",
    icon: DollarSign,
    change: "+12.3%",
    description: "Overall earnings this quarter",
  },
  {
    title: "Active Users",
    value: "45,678",
    icon: Users,
    change: "+5.7%",
    description: "Users engaged in the last 30 days",
  },
  {
    title: "New Accounts",
    value: "1,234",
    icon: CreditCard,
    change: "+3.2%",
    description: "Fresh sign-ups this month",
  },
  { title: "Growth Rate", value: "8.9%", icon: TrendingUp, change: "+1.5%", description: "Year-over-year expansion" },
  {
    title: "Corporate Clients",
    value: "89",
    icon: Briefcase,
    change: "+10.1%",
    description: "Business accounts acquired",
  },
  {
    title: "Security Index",
    value: "98.7%",
    icon: ShieldCheck,
    change: "+0.5%",
    description: "Overall system integrity score",
  },
]

export function MetricsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Responsive card display handled by CSS classes

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % metrics.length)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + metrics.length) % metrics.length)
    }
  }

  useEffect(() => {
    const currentCarousel = carouselRef.current
    if (currentCarousel) {
      const transitionEndHandler = () => {
        setIsAnimating(false)
        if (currentIndex === metrics.length - 1) {
          currentCarousel.style.transition = "none"
          setCurrentIndex(0)
          setTimeout(() => {
            currentCarousel.style.transition = "transform 0.3s ease-in-out"
          }, 50)
        } else if (currentIndex === 0) {
          currentCarousel.style.transition = "none"
          setCurrentIndex(metrics.length - 1)
          setTimeout(() => {
            currentCarousel.style.transition = "transform 0.3s ease-in-out"
          }, 50)
        }
      }

      currentCarousel.addEventListener("transitionend", transitionEndHandler)

      return () => {
        currentCarousel.removeEventListener("transitionend", transitionEndHandler)
      }
    }
  }, [currentIndex])

  const renderMetrics = () => {
    const items = [...metrics, ...metrics, ...metrics]
    return items.map((metric, index) => (
      <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <Card className="h-full mx-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <metric.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span
                className={`text-xs sm:text-sm font-semibold ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm sm:text-lg font-bold mb-2">{metric.title}</h3>
            <p className="text-lg sm:text-2xl font-extrabold mb-3 sm:mb-4">{metric.value}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      </div>
    ))
  }

  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={prevSlide} className="z-10 flex-shrink-0">
          &lt;
        </Button>
        <div className="flex-grow overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)`,
            }}
          >
            {renderMetrics()}
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={nextSlide} className="z-10 flex-shrink-0">
          &gt;
        </Button>
      </div>
    </div>
  )
}
