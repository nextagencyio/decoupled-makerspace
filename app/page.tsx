import { getClient } from '@/lib/drupal-client'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'



export async function generateMetadata(): Promise<Metadata> {
  const title = 'The Tinker Lab - Build Anything You Can Imagine'
  const description = 'A community workshop where makers, tinkerers, artists, and inventors come together to create. Access professional-grade tools, learn new skills, and bring your ideas to life.'

  return {
    title,
    description,
    keywords: ['Makerspace', 'Community Workshop', 'Fab Lab', 'Woodworking', '3D Printing', 'Maker Community'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const client = getClient()

  try {
    const data = await client.raw(GET_HOMEPAGE_DATA)
    const homepageContent = data?.nodeHomepages?.nodes?.[0] || null

    // Check if connected but no content exists - show content import guide
    if (!homepageContent) {
      const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
      return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
    }

    return <HomepageRenderer homepageContent={homepageContent} />
  } catch (error) {
    console.error('Error fetching homepage:', error)
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }
}
