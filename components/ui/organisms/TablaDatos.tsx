"use client"

import { TurnoResponseDTO } from "@/types/entities/turno/TurnoResponseDTO"
import { RoleUser } from "@/types/enum/roleUser"

interface TablaDatosProps {
  data: TurnoResponseDTO[]
  role: RoleUser
  onFinalizar?: (id: number) => void
}



const TablaDatos = ({ data, role, onFinalizar }: TablaDatosProps) => {

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
              <th className="px-4 py-3"></th>
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
                {turno.estado === "Reservado" && (
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onFinalizar?.(turno.id_turno)}
                      className="px-4 py-1.5 cursor-pointer rounded-md border border-green-500 text-green-400  bg-green-950 hover:bg-green-900 hover:text-white  transition-all duration-200 text-xs font-semibold tracking-wide shadow-sm hover:shadow-md">
                      FINALIZAR
                    </button>

                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>


      </div>
    </>
  )
}

export default TablaDatos