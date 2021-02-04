import React, { createRef } from 'react'
import './App.css'
import ProductItem from './ProductItem'

export default class ProductLayout extends React.Component {
  render() {
    return (
      <div className='row'>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Товары</h3>

        {/* {this.props.slice.map((pd, index) => (
               <ProductItem
                  pd={pd}
                  key={index}
                  ref={this.props.arrayRef[pd.id]}
                  addCart={this.props.addCart}
               />
            ))} */}

        {/* {console.log('this.props.slice', this.props.slice)} */}
        {this.props.filtredByNameData.map((pd, index) => {
          return (
            <ProductItem
              pd={pd}
              key={pd.id}
              isChecked={pd.isChecked}
              addToCart={this.props.addToCart}
              changeProductItemCheckedStatus={
                this.props.changeProductItemCheckedStatus
              }
            />
          )
        })}

        {/* {console.log(this.props)} */}
      </div>
    )
  }
}
