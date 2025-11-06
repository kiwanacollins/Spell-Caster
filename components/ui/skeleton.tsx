import { cn } from "@/lib/utils"
import { MysticalLoader } from "./mystical-loader"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

// ServiceCardSkeleton - Ancient themed loading card for services
function ServiceCardSkeleton() {
  return (
    <div className="relative h-full bg-parchment-100 rounded-ritual overflow-hidden border-2 border-parchment-400">
      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystical-gold opacity-40" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystical-gold opacity-40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystical-gold opacity-40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystical-gold opacity-40" />

      {/* Background texture */}
      <div className="absolute inset-0 bg-parchment-texture opacity-20" />

      {/* Card content */}
      <div className="relative p-8 flex flex-col items-center text-center h-full min-h-[400px]">
        {/* Mystical loader centered */}
        <div className="flex-1 flex items-center justify-center">
          <MysticalLoader size={40} />
        </div>
      </div>
    </div>
  )
}

// TestimonialSkeleton - Ancient themed loading for testimonials
function TestimonialSkeleton() {
  return (
    <div className="relative bg-parchment-100 rounded-ritual overflow-hidden border-2 border-parchment-400 p-12">
      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystical-gold opacity-40" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystical-gold opacity-40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystical-gold opacity-40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystical-gold opacity-40" />

      {/* Background texture */}
      <div className="absolute inset-0 bg-parchment-texture opacity-20" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-[300px]">
  <MysticalLoader size={50} />
        <p className="font-serif text-mystical-bronze mt-6 text-sm">
          {/* Consulting the ancient texts... */}
        </p>
      </div>
    </div>
  )
}

export { Skeleton, ServiceCardSkeleton, TestimonialSkeleton }
