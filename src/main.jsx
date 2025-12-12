import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App  from 'src/App.jsx'
import { dataSource , createRandomUser } from 'src/dataSource'


// Populate the fake data source with some initial data
// This would normally come from a server
const db = Array.from({ length: 500 }, createRandomUser)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App dataSource={dataSource.bind(this, db)} />
  </StrictMode>,
)
