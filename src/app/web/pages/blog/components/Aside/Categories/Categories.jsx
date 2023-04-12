import React from "react";

import classes from './Categories.module.css'

const Categories = () => {

  const categories = [
    {
      id: 1,
      name: "Food",
      item: 12
    },
    {
      id: 2,
      name: "Places to visit",
      item: 21
    },
    {
      id: 3,
      name: "New Places",
      item: 44
    },
    {
      id: 4,
      name: "Suggestions and guides",
      item: 31
    },
]

const categoriesList = categories.map(category => {
  return (
    <li className={classes.category} key={category.id}>
      <div>
        <a href=".">{category.name}</a>
      </div>
      <div>
        <span>{`(${category.item})`}</span>
      </div>
    </li>
  )
})

  return (
    <ul className={classes.container}>
      {categoriesList}
    </ul>
  )
};

export default Categories;
