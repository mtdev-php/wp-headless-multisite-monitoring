import Health from '../components/Health'
import Updates from '../components/Updates'

export default function MultiSiteDetail({ site, onBack }) 
{
  return (
    <div className="space-y-6">
      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold">{site.name} Dashboard</h1>
      {/* Pass site info to modules via props or API fetch */}
      <Health site={site} />
      <Updates site={site} />
    </div>
  )
}
