import FooterComponent from "../ui/organisms/FooterComponent"

const Footer = () => {
  const informacion = [
    { title: "ENLACES RÁPIDOS", enlaces: ["Inicio", "Servicios", "Instagram", "Reservar Turno"] },
    { title: "SERVICIOS", enlaces: ["Cortes", "Afeitados", "Colores"] },
    { title: "LEGAL", enlaces: ["Política de Privacidad", "Términos y Condiciones"] },
  ]

  return (
    <footer className="flex flex-col px-6 bg-black py-6">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:gap-8 max-w-6xl mx-auto w-full">
        
        {/* Logo + descripción */}
        <div className="flex flex-col md:w-1/3 mb-6 md:mb-0">
          <img src="./Logo.png" alt="Logo" className="w-24 md:w-32 mb-4" />
          <p className="text-gray-400 text-sm md:text-xs">
            Redefiniendo el cuidado masculino. Tradición, precisión y estilo en cada corte.
          </p>
        </div>

        {/* Secciones dinámicas */}
        <div className="flex flex-col md:flex-row md:justify-end md:gap-12 w-full md:w-2/3">
          {informacion.map((e) => (
            <FooterComponent key={e.title} title={e.title} enlaces={e.enlaces} />
          ))}
        </div>
      </div>

      <hr className="border-gray-700 my-4" />

      <div className="text-center space-y-1">
        <p className="text-gray-600 text-xs">© 2026 LaCero Barber. Todos los derechos reservados.</p>
        <p className="text-gray-600 text-xs">Diseñado con excelencia.</p>
      </div>
    </footer>
  )
}

export default Footer