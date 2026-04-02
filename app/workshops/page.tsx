import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_WORKSHOPS } from '@/lib/queries'
import { WorkshopsData } from '@/lib/types'
import Header from '../components/Header'
import WorkshopCard from '../components/WorkshopCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Workshops | The Tinker Lab',
  description: 'Explore our hands-on workshops.',
}

async function getWorkshops() {
  try {
    const client = getClient()
    const { data } = await client.raw(GET_WORKSHOPS, { first: 50 })
    return data?.nodeWorkshops?.nodes || []
  } catch (error) {
    console.error('Error fetching workshops:', error)
    return []
  }
}

export default async function WorkshopsPage() {
  const items = await getWorkshops()

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-12 left-[8%] w-16 h-16 bg-accent-400 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3.5s' }} />
        <div className="absolute bottom-8 right-[12%] w-12 h-12 bg-yellow-400 rounded-2xl opacity-30 rotate-45 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-8 right-[25%] w-10 h-10 bg-green-300 rounded-xl opacity-35 -rotate-12 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">Workshops</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">Learn new skills with our hands-on, project-based workshops.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold font-display text-gray-600 mb-2">No Workshops Yet</h2>
              <p className="text-gray-500">Workshops will appear here once content is imported.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (<WorkshopCard key={item.id} item={item} />))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
