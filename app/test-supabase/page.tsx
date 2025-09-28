import { supabase } from '@/lib/supabase/client'

export default async function TestSupabasePage() {
  // Test connection
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(1)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Supabase Connection Test
        </h1>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold mb-2">Connection Error:</h2>
            <pre className="text-red-600 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-green-800 font-semibold mb-2">✅ Connection Successful!</h2>
            <p className="text-green-600 mb-4">Successfully connected to Supabase database.</p>
            {data && data.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Sample Project Data:</h3>
                <pre className="bg-white p-4 rounded border text-sm overflow-auto">
                  {JSON.stringify(data[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-semibold mb-2">Environment Variables:</h3>
            <div className="text-blue-600 space-y-1">
              <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
              <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>Go to Supabase Dashboard → SQL Editor</li>
              <li>Copy the entire schema from <code>supabase-schema.sql</code></li>
              <li>Run the SQL to create tables and insert sample data</li>
              <li>Refresh this page to see the sample project data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}