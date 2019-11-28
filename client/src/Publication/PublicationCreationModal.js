import React, { useState } from 'react'

const pug = window.pug
const moment = window.moment

export default props => {
  const monthNames = moment.months()
  const closeFormHandler = props.closeAction
  const submitHandler = props.submit
  let display
  if(props.display) display="show-modal"
  else display=""

  const inputHandlerYear = e =>{
    console.log(e.target.value)
    setYear(e.target.value)
  }
  const inputHandlerMonth = e =>{
    console.log(e.target.value)
    setMonth(e.target.value)
  } 
  const inputHandlerVenue = e =>{
    console.log(e.target.value)
    setVenue(e.target.value)
  } 
  const inputHandlerTitle = e =>{
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  const inputHandlerAuthor = e =>{
    console.log(author)
    setAuthor(e.target.value)
  } 
  const inputHandlerAuthors = e =>{
    console.log(authors)
    setAuthors([author])
  }
  const addAuthorHandler =e =>{
    setAuthors(authors.push(author))
  }
  
  const [year, setYear]=useState('')
  const [month,setMonth]=useState('')
  const [title, setTitle]=useState('')  
  const [venue, setVenue]=useState('')  
  const [author, setAuthor]=useState('') 
  const [authors, setAuthors]=useState([]) 

  return pug`
    .modal(className=display)
      .modal-content
        i.fa.fa-window-close.fa-2x.close-button(onClick=closeFormHandler)

        h2 Création d'une publication

        form(onSubmit=submitHandler)
          label(for="year") Année:

          input(
            type="number",
            name="year",
            min="1900",
            max="2099",
            step="1",
            value=year,
            placeholder="Année",
            onChange= inputHandlerYear
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
            if i=0
            .author-input(key="div" + author)
              input(
                type="text",
                name="authors[]"
                placeholder="Auteur",
                value=author,
                onChange= inputHandlerAuthor)
            
            if i > 0
              .remove-author
                i.fa.fa-minus.fa-3x

          .add-author(onClick=inputHandlerAuthors)
            i.fa.fa-plus.fa-3x

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
