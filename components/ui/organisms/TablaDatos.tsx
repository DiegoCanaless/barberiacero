import { TurnoResponseDTO } from "@/types/entities/turno/TurnoResponseDTO"
import { RoleUser } from "@/types/enum/roleUser"

interface TablaDatosProps{
  data: TurnoResponseDTO[]
  role: RoleUser
}



const TablaDatos = ({ data, role}: TablaDatosProps) => {

  if (!data || data.length === 0) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center border rounded-lg py-16 text-center">
      <p className="text-lg font-semibold">No hay turnos asignados</p>
      <p className="text-sm text-muted-foreground mt-1">
        Cuando tengas turnos aparecerán aquí
      </p>
    </div>
  );
}


  return (
    <>
      <div className=' mt-10 overflow-x-auto border rounded-lg max-w-6xl mx-auto'>
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Servicio</th>

              {role !== "barber" && (
                <th className="px-4 py-3">Barbero</th>
              )}
              
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Hora</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((turno) => (
              <tr key={turno.id_turno} className="border-t border-neutral-800 ">
                  <td className="px-4 py-3 text-center">{turno.cliente.name}</td>

                  <td className="px-4 py-3 text-center">{turno.servicio}</td>

                  {role !== "barber" && (
                    <td className="px-4 py-3 text-center">{turno.barbero.name}</td>
                  )}

                  <td className="px-4 py-3 text-center">{new Date(turno.fecha).toLocaleDateString("es-AR")}</td>
                  <td className="px-4 py-3 text-center">{turno.horario}</td>
                  <td className="px-4 py-3 text-center">{turno.estado}</td>
              </tr>
            ))}
          </tbody>

        </table>


      </div>
    </>
  )
}

export default TablaDatos