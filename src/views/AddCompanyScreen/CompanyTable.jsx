import React from 'react'

const CompanyTable = ({ companies, enableEdition, deleteCompany }) => {
    return (
        <table className="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Compañia</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>

                {companies &&
                    companies.map(empresa => (
                        <tr key={empresa.id}>
                            <th scope="row">{empresa.id}</th>
                            <td>{empresa.name}</td>
                            <td>{empresa.place.name}</td>
                            <td><button onClick={() => enableEdition(empresa)} className="btn btn-warning btn-sm mr-3">Editar</button>
                                <button onClick={() => deleteCompany(empresa.id)} className="btn btn-danger btn-sm">Borrar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CompanyTable
