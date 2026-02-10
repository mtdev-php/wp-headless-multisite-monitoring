import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function Health({ site })
{
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
     apiGet(site.api_url + '/health', site.user, site.password)
      .then(setData)
      .catch(err => setError(err.message));
  }, [site]);

  if(error){
    return <div className="text-red-600">Error: {error}</div>;
  }

  if(!data){
    return <div>Loading health data…</div>;
  }

  const fatal = data.last_fatal;

  return (
    <div className="grid grid-cols-2 gap-4">
      <HealthCard label="WP Version" value={data.wp_version} />
      <HealthCard label="PHP Version" value={data.php_version} />
      <HealthCard label="MySQL" value={data.mysql} />
      <HealthCard label="Debug Mode" value={data.debug ? 'On' : 'Off'} />
      <HealthCard label="Cron" value={data.cron ? 'Enabled' : 'Disabled'} />
      <HealthCard label="Memory Limit" value={data.memory_limit} />
      <HealthCard label="Fatal Error" value={fatal ? 'Detected' : 'None'} status={fatal ? 'error' : 'ok'}/>
    </div>
  );
}

function HealthCard({ label, value, status = null})
{
  const styles = {
    error: 'border-red-500 text-red-700 bg-red-50',
  }

  return(
    <div className={`p-4 rounded shadow border-l-4 ${styles[status]}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}