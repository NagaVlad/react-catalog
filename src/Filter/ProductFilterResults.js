import React, { Component } from "react"

class ProductFilterResults extends Component {


   state = {
      show: ''
   }

   render() {
      var results = [];

      // if (this.props.abv === true) {
      // console.log('Сортировка', this.props.data.sort((a, b) => { return b.abv - a.abv }));
      // }

      if (this.props.checked) {
         this.props.data.map((product) => {
            if (this.props.abv < product.abv) {
               results.push(product);
               console.log('СОРТИРОВАННЫЙ', results);
            }

            let show = results.map((pd, index) =>
               <React.Fragment>
                  <div className="col s3 offset-s1" key={index}>
                     <div className="card">
                        <div className="card-image">
                           <img src={pd.image_url} />
                           <span className="card-title red-text">{pd.name}</span>
                        </div>
                        <div className="card-content">
                           <p>99 $</p>
                        </div>
                        <div className="card-action">
                           <label>
                              <input type="checkbox" onChange={() => this.addCart(pd.name)} />
                              <span>Add to cart</span>
                           </label>
                        </div>
                     </div>
                  </div>
               </React.Fragment>)
         });
      }

      return (
         <div>
            <h1>Результат сортировки</h1>
            {this.state.show}
         </div>
      )
   }
}
export default ProductFilterResults