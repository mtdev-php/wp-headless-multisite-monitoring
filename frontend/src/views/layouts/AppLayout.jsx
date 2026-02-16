// AppLayout.jsx
import { Outlet } from 'react-router-dom'

export function AppLayout({ children }) 
{

  return(
    
    <div className="min-h-full">

      <nav className="bg-gray-800">
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="size-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                  <a 
                    href="/" 
                    aria-current={location.pathname === '/' ? 'page' : undefined} 
                    className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    
    </div>
  )
}
