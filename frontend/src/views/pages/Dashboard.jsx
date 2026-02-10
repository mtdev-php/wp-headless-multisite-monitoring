import { useEffect, useState } from 'react';
import { SITES } from '../../config/sites'
import { apiGet } from '../../services/api';
import MultiSiteDetail from '../../components/MultiSiteDetails'
import noImage from '../../assets/no-image.svg'

export default function MultiSiteCards() {

  const [selectedSite, setSelectedSite] = useState(null)
  const [sitesData, setSitesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    Promise.all(
      SITES.map(async (site) => {
        try {
          const info = await apiGet(`${site.api_url}/site`, site.user, site.password)
          return {
            ...site,
            siteUrl: info.url,
            name: info.name,
            logo: info.logo,
            status: 'online', // Site is up
            error: null
          }
        } catch (error) {
          // Site is down - return it with error status
          return {
            ...site,
            siteUrl: site.url,
            name: site.name, // Use fallback name from config
            logo: null,
            status: 'offline', // Site is down
            error: error.message
          }
        }
      })
    ).then((data) => {
      setSitesData(data)
      setLoading(false)
    })
  }, [])

  if(selectedSite){
    return (
      <MultiSiteDetail 
        site={selectedSite} 
        onBack={() => setSelectedSite(null)} 
      />
    )
  }

  if(loading){
    return <div className="text-center p-8">Loading sites...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sitesData.map((site, idx) => (
        <div
          key={idx}
          className={`bg-white rounded shadow hover:shadow-lg cursor-pointer overflow-hidden ${
            site.status === 'offline' ? 'border-2 border-red-500' : ''
          }`}
          onClick={() => {
            if(site.status === 'offline'){
              window.location.href= site.siteUrl
            }else{
              setSelectedSite(site);
            }
          }}
        >
          {/* Status indicator */}
          <div className={`h-2 ${
            site.status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          
          <img
            src={site.logo || noImage}
            alt={site.name}
            className="w-full h-32 object-contain bg-gray-50"
            onError={(e) => (e.currentTarget.src = noImage)}
          />

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{site.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                site.status === 'online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {site.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{site.siteUrl}</p>
            {site.error && (
              <p className="text-xs text-red-600 mt-2">Error: {site.error}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}