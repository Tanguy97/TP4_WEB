import React, { useState, useEffect } from 'react'

import Loader from '../Loader/Loader'

import './Project.css'
import PublicationTable from '../Publication/PublicationTable.js'
const pug = window.pug
const fetch = window.fetch

export default props => {

  // À COMPLÉTER
  // Cette composante correspond à la route '/projects/:id'. L'identifiant id est disponible dans 'props.match.params.id'
  // 1- Récupérer le project du service web http://localhost:3000/api/projects/:id avec 'fetch' et avec l'entête 'accept-language' à 'fr'.
  // 2- Une fois que les données ont été récupérées, le loading devient false
  // 3- Réutilisez la composante PublicationTable
  // 4- Si on supprime une publication, la liste doit être mise à jour.


  const url = 'http://localhost:3000/api/projects/' + props.match.params.id

  const [publications, setPublications]= useState([])
  const [project, setProject]= useState({})
  const [loading, setLoading]= useState(true)

  useEffect(()=>{
    const fetchProject = async()=>{
      const reponse = await fetch(url, {'accept-language':'fr'})
      const proj = await reponse.json()
      setProject(proj["project"])
      setPublications(proj["publications"])
      setLoading(false)
    }
    fetchProject()
  },[])


  return pug`
    .loading-container
      if loading
        Loader(loading=loading)

      else
        if project && Object.keys(project).length !== 0
          h1= project.title

          section.description
            footer.meta
              p
                | Étudiant: #{''}
                = project.student

              p
                | Directeur(e): #{''}
                = project.supervisor

              if project.cosupervisor
                p
                  | Co-directeur(e)(s): #{''}
                  = project.cosupervisor

            div
              each paragraph, i in project.description.split('\n')
                p(key=i)= paragraph

            if project.thesisUrl
              p
                | Pour plus d'informations, #{''}
                a(href=project.thesisUrl) cliquez ici

          if publications.length > 0
            h2 Publications
            PublicationTable(publications=publications)
  `
}
