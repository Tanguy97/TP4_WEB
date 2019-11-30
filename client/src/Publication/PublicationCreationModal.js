import React, { useState } from 'react'

const pug = window.pug
const moment = window.moment

export default props => {
  const monthNames = moment.months()
  const closeFormHandler = props.closeAction
  const err = props.err
  let display
  if(props.display) display="show-modal"
  else display=""

  const [year, setYear]=useState('2000')
  const [month,setMonth]=useState('')
  const [title, setTitle]=useState('test title')
  const [venue, setVenue]=useState('test venue')
  const [authors, setAuthors]=useState(['test'])

  const inputHandlerYear = e =>{
    setYear(e.target.value)
  }

  const inputHandlerMonth = e =>{
    setMonth(e.target.value)
  }

  const inputHandlerVenue = e =>{
    setVenue(e.target.value)
  }

  const addAuthor = e =>{
    setAuthors(authors.concat(['test']))
  }

  const removeAuthor = e =>{
    setAuthors(authors.filter((a,i)=> i!=e.target.dataset.id))
  }

  const inputHandlerAuthor = e =>{
    const newAuthors = [...authors]
    newAuthors[e.target.dataset.id] = e.target.value
    setAuthors(newAuthors)
  }

  const inputHandlerTitle = e =>{
    setTitle(e.target.value)
  }

  const submitHandler = e =>{
    e.preventDefault()
    const fetchSubmitedPublication= async()=>{
      const data= {year: year,
                   month: month,
                   authors: authors,
                   title: title,
                   venue: venue
                  }
      const submited= await fetch('http://localhost:3000/api/publications/', {method:'post',headers: {
    'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(data)})
      const res = await submited.json()
      err(res.errors)
    }

    fetchSubmitedPublication()
    setMonth('')
    closeFormHandler()
  }

  return pug`
    .modal(className=display)
      .modal-content
        i.fa.fa-window-close.fa-2x.close-button(onClick=closeFormHandler)

        h2 Création d'une publication

        form(method='POST',onSubmit=submitHandler)
          label(for="year") Année:

          input(
            type="number",
            name="year",
            min="1900",
            max="2099",
            step="1",
            value=year,
            placeholder="Année",
            onChange= inputHandlerYear,
            )

          br

          label(for="month") Mois #{' '}

          select(name="month", value=month, onChange= inputHandlerMonth)
            option(value="")
              | - #{' '} Mois - #{' '}

            each monthName, i in monthNames
              option(key=monthName, value=i)= monthName.charAt(0).toUpperCase() + monthName.slice(1)

          br

          label(for="title") Titre #{':'}

          input(type="text",
            name="title",
            placeholder="Titre",
            value=title,
            onChange= inputHandlerTitle)

          br

          label(for="authors") Auteur #{':'}

          br

          each author, i in authors
            .author-input(key="div" + i)
              input(
                type="text",
                name="authors[]"
                placeholder="Auteur",
                value=author,
                onChange=inputHandlerAuthor,
                data-id=i)

            if i > 0
              .remove-author
                i.fa.fa-minus.fa-3x(data-id=i,onClick=removeAuthor)

          .add-author
            i.fa.fa-plus.fa-3x(onClick=addAuthor)

          label(for="venue") Revue #{''}

          input(
            type="text",
            name="venue",
            placeholder="Revue",
            value=venue,
            onChange= inputHandlerVenue)

          br

          input(type="submit", value="Création d'une publication")
  `
}
