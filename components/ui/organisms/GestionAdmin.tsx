const GestionAdmin = () => {
  return (
    <div className="mt-10 w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-black sm:text-3xl">GESTIÓN GLOBAL</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Control total sobre las reservas de la barbería.</p>
        </div>

        <div className="flex flex-col items-center justify-center  w-full sm:w-40  py-6  rounded-md  bg-card  border border-neutral-800 shadow-sm">
          <p className="text-4xl sm:text-3xl font-black">2</p>
          <p className="text-muted-foreground text-xs tracking-wider">TOTAL RESERVAS</p>
        </div>

      </div>

    </div>
  )
}

export default GestionAdmin
