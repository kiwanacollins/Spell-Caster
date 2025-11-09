'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoPlay, IoPause, IoChevronBack, IoChevronForward, IoStar } from "react-icons/io5";

interface TestimonialVideo {
  id: string;
  videoUrl: string;
  clientName: string;
  serviceType: string;
  rating: number;
}

/**
 * Video Testimonials / Results Section Component
 * Displays video testimonials with auto-rotating carousel and ancient frame styling
 * 
 * Subtasks:
 * 4.2.3.1 - Video testimonial player using HTML5 video with ancient frame styling
 * 4.2.3.2 - Integrate video testimonials from public/testimony-videos directory
 * 4.2.3.3 - Add 5-star rating display with ⭐️ icons below each video
 * 4.2.3.4 - Include "97% Success Rate" badge with mystical styling
 * 4.2.3.5 - Implement auto-rotating video carousel with fade transitions and controls
 * 4.2.3.6 - Add client names and service types overlay on video testimonials
 * 4.2.3.7 - Include play/pause controls with ancient styling
 */
export function VideoTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 4.2.3.2 - Video testimonials from public/testimony-videos directory
  const testimonials: TestimonialVideo[] = [
    {
      id: 'love-back',
      videoUrl: '/testimony-videos/love-back.mp4',
      clientName: 'Sarah M.',
      serviceType: 'Love Spell',
      rating: 5,
    },
    {
      id: 'love',
      videoUrl: '/testimony-videos/love.mp4',
      clientName: 'Michael T.',
      serviceType: 'Relationship Binding',
      rating: 5,
    },
    {
      id: 'business-welness',
      videoUrl: '/testimony-videos/business-welness.mp4',
      clientName: 'Jennifer K.',
      serviceType: 'Business Boost',
      rating: 5,
    },
    {
      id: 'magic-rings',
      videoUrl: '/testimony-videos/magic-rings.mp4',
      clientName: 'Healer',
      serviceType: 'Magic Rings',
      rating: 5,
    },
    {
      id: 'magic-ring-rituals',
      videoUrl: '/testimony-videos/magic-ring-rituals.mp4',
      clientName: 'Amanda R.',
      serviceType: 'Magic Ring Ritual',
      rating: 5,
    },
    {
      id: 'preforming-spiritaul-rutuals',
      videoUrl: '/testimony-videos/preforming-spiritaul-rutuals.mp4',
      clientName: 'Healer',
      serviceType: 'Spiritual Cleansing',
      rating: 5,
    },
  ];

  const currentTestimonial = testimonials[currentIndex];

  // 4.2.3.7 - Play/pause controls
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsAutoRotating(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setIsAutoRotating(false);
    }
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // 4.2.3.5 - Auto-rotating carousel (every 10 seconds if not playing)
  useEffect(() => {
    if (!isAutoRotating || isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, isPlaying, handleNext]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setIsAutoRotating(true);
      handleNext();
    };

    video.addEventListener('ended', handleVideoEnd);
    return () => video.removeEventListener('ended', handleVideoEnd);
  }, [handleNext]);

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="font-['MedievalSharp'] text-3xl text-[#F4E8D0]">✦ Sacred Testimonials ✦</h2>
        <p className="font-['Crimson_Text'] text-[#C0C0C0] text-lg">
          Witness the transformative power of ancient spiritual practices
        </p>
        
        {/* 4.2.3.4 - 97% Success Rate Badge */}
        <div className="flex justify-center pt-2">
          <Badge className="bg-[#B8860B] text-[#1A1A1A] font-['Cinzel'] text-lg px-4 py-2 border-2 border-[#8B6F47] shadow-lg">
            ⭐ 97% Success Rate ⭐
          </Badge>
        </div>
      </div>

      {/* Video Player Card */}
      <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden max-w-4xl mx-auto">
        <CardHeader className="pb-3">
          <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A] text-center">
            Client Success Stories
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 4.2.3.1 - Video Player with Ancient Frame Styling */}
          <div className="relative aspect-video bg-[#1A1A1A] rounded-lg overflow-hidden border-4 border-[#8B6F47] shadow-inner">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={currentTestimonial.videoUrl}
              playsInline
            >
              Your browser does not support the video tag.
            </video>

            {/* 4.2.3.6 - Client Name and Service Type Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#1A1A1A]/90 to-transparent p-4">
              <p className="font-['Cinzel'] text-[#F4E8D0] text-lg font-semibold">
                {currentTestimonial.clientName}
              </p>
              <p className="font-['Crimson_Text'] text-[#C0C0C0] text-sm">
                {currentTestimonial.serviceType}
              </p>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-2 left-2 text-[#B8860B] text-2xl opacity-60">✦</div>
            <div className="absolute top-2 right-2 text-[#B8860B] text-2xl opacity-60">✦</div>
            <div className="absolute bottom-2 left-2 text-[#B8860B] text-2xl opacity-60">✦</div>
            <div className="absolute bottom-2 right-2 text-[#B8860B] text-2xl opacity-60">✦</div>
          </div>

          {/* 4.2.3.7 - Play/Pause and Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              className="border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#F4E8D0]"
            >
              <IoChevronBack className="h-5 w-5" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              onClick={togglePlayPause}
              className="flex-1 bg-[#8B6F47] hover:bg-[#6B4F27] text-[#F4E8D0] font-['Cinzel'] text-base border-2 border-[#5B3F17] shadow-md"
            >
              {isPlaying ? (
                <>
                  <IoPause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <IoPlay className="mr-2 h-5 w-5" />
                  Play Testimonial
                </>
              )}
            </Button>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#F4E8D0]"
            >
              <IoChevronForward className="h-5 w-5" />
            </Button>
          </div>

          {/* 4.2.3.3 - 5-Star Rating Display */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <IoStar
                  key={index}
                  className={`h-6 w-6 ${
                    index < currentTestimonial.rating
                      ? 'text-[#B8860B] fill-[#B8860B]'
                      : 'text-[#8B6F47]/30'
                  }`}
                />
              ))}
            </div>
            <span className="font-['Crimson_Text'] text-[#4A4A4A] text-sm ml-2">
              ({currentTestimonial.rating}/5)
            </span>
          </div>

          {/* Video Counter */}
          <div className="text-center">
            <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
              Testimonial {currentIndex + 1} of {testimonials.length}
            </p>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#B8860B]'
                    : 'w-2 bg-[#8B6F47]/30 hover:bg-[#8B6F47]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Message */}
      <div className="text-center space-y-2 pt-4">
        <p className="font-['IM_Fell_English'] text-[#C0C0C0] text-base italic">
          Real transformations from seekers who trusted the ancient path
        </p>
        <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
          Your sacred journey awaits • Contact us to begin your transformation
        </p>
      </div>
    </div>
  );
}
