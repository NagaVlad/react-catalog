
import React, { Component } from "react"
import ProductFilterMenu from './ProductFilterMenu'
import ProductFilterResults from './ProductFilterResults'

class ProductFilter extends Component {
   // constructor(props) {
   //    super(props);
   //    this.handleFormInputFilter = this.handleFormInputFilter.bind(this);

   //    this.state = {
   //       series: 0,
   //       abv: 12,
   //       checked: false
   //    }
   //    this.handleChangeFilter = this.handleChangeFilter.bind(this)
   // }

   // handleFormInputFilter(abv, series) {
   //    this.setState({
   //       series: series,
   //       abv: abv
   //    })
   // }

   // handleChangeFilter() {
   //    this.setState(
   //       (prevState) => ({ checked: !prevState.checked }),
   //       // () => { console.log(this.state.checked); }
   //    )
   // }

   render() {
      return (
         <>
            <ProductFilterMenu
               series={this.props.series}
               abv={this.props.abv}
               handleChangeFilter={this.props.handleChangeFilter}
            />

            {/* <ProductFilterResults
               data={this.props.data}
               abv={this.props.abv}
               checked={this.props.checked}
            /> */}
            {/* {console.log(this.props.data)} */}
         </>
      )
   }
}

export default ProductFilter