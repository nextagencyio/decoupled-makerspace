'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Wrench, Lightbulb, Cpu, Scissors, Zap, Cog } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const makerAreas = [
  { icon: Wrench, label: 'Woodworking', color: 'bg-primary-100 text-primary-600 border-primary-200' },
  { icon: Lightbulb, label: 'Electronics', color: 'bg-accent-100 text-accent-600 border-accent-200' },
  { icon: Cpu, label: '3D Printing', color: 'bg-green-100 text-green-600 border-green-200' },
  { icon: Scissors, label: 'Textiles', color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { icon: Zap, label: 'Laser Cutting', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { icon: Cog, label: 'CNC Milling', color: 'bg-red-100 text-red-500 border-red-200' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&fit=crop', alt: 'Maker working with technology', border: 'border-primary-300' },
  { src: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80&fit=crop', alt: '3D printer creating a prototype', border: 'border-accent-300' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop', alt: 'Workshop tools and equipment', border: 'border-green-300' },
  { src: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=600&q=80&fit=crop', alt: 'Hands crafting in workshop', border: 'border-purple-300' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  const features = (homepageContent as any)?.featuresItems || []
  const featuresTitle = (homepageContent as any)?.featuresTitle || 'Our Workshops'
  const featuresSubtitle = (homepageContent as any)?.featuresSubtitle || ''

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Featured Workshops Preview */}
      {features.length > 0 && (
        <section className="py-20 bg-orange-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold font-display text-primary-800 mb-4">{featuresTitle}</h2>
              {featuresSubtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{featuresSubtitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.slice(0, 3).map((feature: any, i: number) => {
                const rotations = ['-rotate-1', 'rotate-1', '-rotate-2']
                const shadows = ['shadow-primary-200/50', 'shadow-accent-200/50', 'shadow-green-200/50']
                const borders = ['border-primary-200', 'border-accent-200', 'border-green-200']
                return (
                  <div
                    key={feature.id || i}
                    className={`bg-white rounded-3xl p-8 border-2 ${borders[i % 3]} shadow-lg ${shadows[i % 3]} hover:-rotate-1 hover:scale-105 transition-all duration-300 ${rotations[i % 3]}`}
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-5 rotate-6">
                      <Wrench className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-gray-900 mb-3">{feature.title}</h3>
                    {feature.description?.processed && (
                      <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: feature.description.processed }} />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/workshops"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-500 transition-all duration-200 shadow-lg shadow-primary-200 hover:-translate-y-1"
              >
                View All Workshops
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Maker Skills Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -top-16 left-1/2 w-64 h-64 bg-primary-50 rounded-full -translate-x-1/2 opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-primary-800 mb-4">What You Can Make</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From prototyping to production, explore the tools and techniques available in our fully-equipped workshop.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {makerAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <div key={i} className="flex flex-col items-center group">
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full border-4 ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-md`}>
                    <Icon className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <span className="font-bold font-display text-gray-800 text-center text-sm md:text-base">{area.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-orange-50 relative overflow-hidden">
        <div className="absolute top-8 right-[5%] w-20 h-20 bg-accent-200 rounded-full opacity-40" />
        <div className="absolute bottom-12 left-[8%] w-16 h-16 bg-primary-200 rounded-2xl opacity-40 rotate-12" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-primary-800 mb-4">Inside The Tinker Lab</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our space where creativity meets craftsmanship -- tools, projects, and community in action.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative aspect-square rounded-3xl overflow-hidden border-4 ${img.border} shadow-lg hover:scale-105 hover:-rotate-2 transition-all duration-300`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Playful Colorful Footer */}
      <footer className="bg-primary-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-400 via-yellow-400 to-primary-400" />
        <div className="absolute top-8 right-[10%] w-16 h-16 bg-accent-400 rounded-full opacity-10" />
        <div className="absolute bottom-8 left-[15%] w-20 h-20 bg-yellow-400 rounded-2xl opacity-10 rotate-12" />
        <div className="absolute top-20 left-[5%] w-12 h-12 bg-green-400 rounded-full opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center rotate-3">
                  <Wrench className="w-6 h-6 text-accent-300" />
                </div>
                <h3 className="text-2xl font-bold font-display text-accent-300">The Tinker Lab</h3>
              </div>
              <p className="text-primary-200 mb-4 max-w-md">
                Where makers, tinkerers, and creators come together to build, learn, and innovate.
              </p>
            </div>
            <div>
              <h4 className="font-bold font-display text-accent-300 mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-primary-200">
                <li><a href="/workshops" className="hover:text-accent-300 transition-colors">Workshops</a></li>
                <li><a href="/equipment" className="hover:text-accent-300 transition-colors">Equipment</a></li>
                <li><a href="/events" className="hover:text-accent-300 transition-colors">Events</a></li>
                <li><a href="/about" className="hover:text-accent-300 transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-display text-accent-300 mb-4 text-lg">Contact</h4>
              <ul className="space-y-2 text-primary-200">
                <li>42 Maker Way</li>
                <li>Innovation District, CA 94103</li>
                <li>info@tinkerlab.example.com</li>
                <li>(555) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-700 mt-10 pt-8 text-center text-primary-300">
            <p>&copy; {new Date().getFullYear()} The Tinker Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
