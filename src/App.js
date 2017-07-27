import React, { Component } from 'react';
import './App.css';
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'

const subCategories = [
  {
    id: 3,
    name: 'Setor1',
    subCategories: [],
    field: false
  },
  {
    id: 4,
    name: 'Setor2',
    subCategories: [],
    field: false
  },
  {
    id: 5,
    name: 'Setor3',
    subCategories: [],
    field: false
  }
];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 0,
          name: 'Financeiro',
          subCategories: [],
          field: false
        },
        {
          id: 1,
          name: 'Administrativo',
          subCategories: [],
          field: false
        },
        {
          id: 2,
          name: 'Jurídico',
          subCategories: [],
          field: false
        }
      ],
      subCategory: false,
      selectedCategories: false
    }

    this.createCategories = this.createCategories.bind(this)
    this.createSubcategorie = this.createSubcategorie.bind(this)
  }

  renderFieldInput(show) {
    const toggle = show ? 'show' : 'hide'
    return (
      <div className={toggle}>
        <input type="text" />
      </div>
    )
  }

  createSubcategorie(index, key) {

    return (
      <div key={key} className="subcategorie line">
        <i className="fa fa-minus-square-o" aria-hidden="true"></i>
        <input type="checkbox" type="checkbox" checked="checked" />
        {index.name}
        <a>Add subcategoria</a>
      </div>
    )
  }

  appendInputName(id) {

    const index = findIndex(this.state.categories, { id: parseInt(id, 10) })

    const newState =  Object.assign(...this.state, this.state.categories[index], {field: true})

    this.setState({ ...this.state, newState})
  }

  appendFieldSubCategory(id) {

    const index = findIndex(this.state.categories, { id: parseInt(id, 10) })

    const newState =  Object.assign(...this.state, this.state.categories[index], {subCategories: subCategories})

    this.setState({ ...this.state, newState})
    this.setState({
      selectedCategories: true
    })

  }

  renderFieldsSubcategory(subCategories) {
    return map(subCategories, this.createSubcategorie)
  }

  createCategories(index, key) {
    const { subCategory } = this.state;
    const { id, name, subCategories, field } = index

    return (
      <div className="line" key={id}>
        <i className="fa fa-plus-square" aria-hidden="true" onClick={() => this.appendFieldSubCategory(id)}/>
        <input type="checkbox" /> {name}
        <a onClick={() => this.appendInputName(id)}>Add subcategoria</a>
        {field && this.renderFieldInput(true)}
        {subCategories && this.renderFieldsSubcategory(subCategories)}
      </div>
    )
  }

  renderSelectedCategories() {

    return (
      <div className="selected">
        <span className="sel">Financeiro</span>
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        <span className="sel"> Setor1 </span>
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        <span className="sel"> Setor3 </span>
        <i className="fa fa-times-circle-o" aria-hidden="true"></i>
      </div>
    )
  }

  render() {
    const { categories, selectedCategories } = this.state
    return (
      <div className="App">
        <div className="container">
            <h1>Categorias</h1>

            <div className="tree">
              {map(categories, this.createCategories)}
            </div>

            <div className="form">
              <form>
                <div>
                  <label>Descrição</label>
                  <div><textarea></textarea></div>
                </div>
                <div>
                  <div className="left">
                    <label>SLA</label>
                      <div><input type="text" /></div>
                  </div>
                  <div className="left">
                    <label>Tipo</label>
                    <div><select><option>Dias</option></select></div>
                  </div>
                  <div className="left">
                    <label>Fluxo</label>
                    <div><select><option>Fluxo</option></select></div>
                  </div>
                </div>
                <div>
                  {selectedCategories && this.renderSelectedCategories()}
                </div>
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
