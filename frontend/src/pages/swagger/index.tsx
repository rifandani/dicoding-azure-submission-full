import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'

const SwaggerUIPage: React.FC = () => {
  return (
    <div className="flex-col space-y-3 bg-white">
      <Header />

      <SwaggerUI url="https://raw.githubusercontent.com/rifandani/dicoding-azure-submission/master/frontend/swagger.yaml" />

      <Footer />
    </div>
  )
}

export default SwaggerUIPage
