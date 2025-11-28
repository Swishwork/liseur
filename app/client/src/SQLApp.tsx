import { useState } from 'react'

function SQLApp() {
  const [queryInput, setQueryInput] = useState('')
  const [hasData, setHasData] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [availableTables, setAvailableTables] = useState<string[]>([])
  const [queryResult, setQueryResult] = useState<any>(null)
  const [sqlTranslation, setSqlTranslation] = useState('')

  const sampleQueries = [
    "Show me all users who signed up this month",
    "What is the average age of our users?", 
    "Find users with the most activity",
    "List users by signup date",
    "Show user demographics breakdown"
  ]

  const handleGenerateRandomQuery = () => {
    if (!hasData) {
      setQueryInput("Please upload some data first to generate queries.")
      return
    }
    
    const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
    setQueryInput(randomQuery)
  }

  const handleUploadData = () => {
    setShowUploadModal(true)
  }

  const handleUsersDataSample = () => {
    setHasData(true)
    setAvailableTables(['users'])
    setShowUploadModal(false)
  }

  const handleQuery = () => {
    if (!queryInput || !hasData) return
    
    // Mock SQL translation
    setSqlTranslation("SELECT * FROM users WHERE signup_date >= '2023-01-01'")
    
    // Mock results
    setQueryResult({
      columns: ['id', 'name', 'email', 'signup_date'],
      rows: [
        [1, 'John Doe', 'john@example.com', '2023-06-15'],
        [2, 'Jane Smith', 'jane@example.com', '2023-07-20'],
        [3, 'Bob Johnson', 'bob@example.com', '2023-08-10']
      ]
    })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h1>Natural Language SQL Interface</h1>
      </header>

      <main>
        {/* Query Controls */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={handleUploadData}>Upload Data</button>
          <button 
            onClick={handleGenerateRandomQuery}
            style={{ marginLeft: 'auto' }}
          >
            Generate Random Query
          </button>
        </div>

        {/* Query Input */}
        <div style={{ marginBottom: '20px' }}>
          <textarea
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Enter your natural language query here..."
            style={{ 
              width: '100%', 
              height: '100px', 
              padding: '10px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Query Button */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleQuery}
            disabled={!queryInput || !hasData}
          >
            Query
          </button>
        </div>

        {/* Available Tables */}
        {availableTables.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Available Tables</h3>
            <ul>
              {availableTables.map(table => (
                <li key={table}>{table}</li>
              ))}
            </ul>
          </div>
        )}

        {/* SQL Translation */}
        {sqlTranslation && (
          <div style={{ marginBottom: '20px' }}>
            <h3>SQL Translation</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {sqlTranslation}
            </pre>
          </div>
        )}

        {/* Results */}
        {queryResult && (
          <div>
            <h3>Results</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {queryResult.columns.map((col: string) => (
                    <th key={col} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.rows.map((row: any[], idx: number) => (
                  <tr key={idx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px'
          }}>
            <h3>Upload Data</h3>
            <p>Choose a sample dataset:</p>
            <button onClick={handleUsersDataSample}>Users Data</button>
            <button 
              onClick={() => setShowUploadModal(false)}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SQLApp