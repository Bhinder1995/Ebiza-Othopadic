import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ebiza Orthopaedic',
    short_name: 'Ebiza',
    description: 'ISO Certified Orthopaedic Appliances & Fracture Aids',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F7FB',
    theme_color: '#0057A8',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
