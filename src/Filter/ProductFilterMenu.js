import React, { Component } from 'react'

class ProductFilterMenu extends Component {
  render() {
    return (
      <div>
        <h3>Сортировать товары</h3>
        <form action='#'>
          <p>
            <label>
              <input
                type='checkbox'
                onChange={() => {
                  this.props.handleChangeFilter()
                }}
              />
              <span>Крепость меньше 8</span>
            </label>
          </p>
          {/* <p>Соятояние сортировки {this.state.checked}</p> */}
        </form>
      </div>
    )
  }
}

export default ProductFilterMenu
