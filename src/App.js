import React, { Component } from 'react';
import './App.css';
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'

const subCategories = ['Setor1', 'Setor2', 'Setor3', 'Setor4'];

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
    }

    this.createCategories = this.createCategories.bind(this)
  }

  renderFieldSubCategory(show) {
    const toggle = show ? 'show' : 'hide'
    return (
      <div className={toggle}>
        <input type="text" />
      </div>
    )
  }

  createSubcategorie() {
    return (
      <div>
        <i className="fa fa-minus-square-o" aria-hidden="true"></i>
        <input type="checkbox" type="checkbox" checked="checked"/>
      </div>
    )
  }

  appendFieldSubCategory(id) {

    const index = findIndex(this.state.categories, { id: parseInt(id, 10) })

    const newState =  Object.assign(...this.state, this.state.categories[index], {field: true})

    this.setState({ ...this.state, newState})
  }

  createCategories(index, key) {
    const { subCategory } = this.state;
    const { id, name, subCategories, field } = index

    return (
      <div className="line" key={id}>
        <i className="fa fa-plus-square" aria-hidden="true" />
        <input type="checkbox" /> {name}
        <a onClick={() => this.appendFieldSubCategory(id)}>Adicionar uma subcategoria</a>
        {field && this.renderFieldSubCategory(true)}
      </div>
    )
  }
  render() {
    const { categories } = this.state
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
              </form>
            </div>

        </div>
      </div>
    );
  }
}

export default App;
