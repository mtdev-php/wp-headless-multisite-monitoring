// src/modules/updates/Updates.jsx
import { useEffect, useState } from 'react'
import { apiGet } from '../services/api'

export default function Updates({ site })
{
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
     apiGet(site.api_url + '/updates', site.user, site.password)
      .then(setData)
      .catch(err => setError(err.message));
  }, [site]);

  if(error){
    return <div className="text-red-600">Error: {error}</div>
  }

  if(!data){
    return <div>Loading datas…</div>
  }

  return(
    <div className="space-y-6">
      {/* WordPress Core */}
      <UpdateCard
        title="WordPress Core"
        value={data.core.available ? 'Update Available' : 'Up to date'}
        status={data.core.available ? 'warning' : 'ok'}
      />

      {/* Plugins list */}
      <UpdateList title="Plugins" items={data.plugins} />

      {/* Themes list */}
      <UpdateList title="Themes" items={data.themes} />
    </div>
  )
}

// Card component for WordPress Core
function UpdateCard({ title, value, status })
{
  const colors = {
    ok: 'border-green-500 text-green-600',
    warning: 'border-orange-500 text-orange-600',
  }

  return (
    <div className={`bg-white p-4 rounded shadow border-l-4 ${colors[status]}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}

function UpdateAvailable({ available })
{
  if(available) {
    return <span className="text-orange-600 font-bold">Update available</span>;
  }else{
    return <span className="text-green-600 font-bold">Up to date</span>;
  }
}

// List component for Plugins and Themes
function UpdateList({ title, items }) 
{
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="bg-white rounded shadow divide-y">
        {items.map((item, idx) => (
          <li key={idx} className="p-2 flex justify-between items-center">
            <span>{item.name} ({item.version})</span>
            <UpdateAvailable available={item.update_available} />  
          </li>
        ))}
      </ul>
    </div>
  )
}
