import React from 'react';

import Cart from './Cart';
import Registration from './Registration'

export default class App extends React.Component {


   constructor(props) {
      super(props);
      this.state = {
         modal: false,
         modalReg: false,
         data: [],
         cart: [],
         isEmpty: 'true',
         total: 0

      }

      this.deleteHandler = this.deleteHandler.bind(this)
   }






   componentDidMount() {
      // fetch('https://api.punkapi.com/v2/beers?ibu_lt=1')
      fetch('https://api.punkapi.com/v2/beers?page=2&per_page=5')
         .then((res) => res.json())
         .then((data) => this.setState({ data: [...data] }));
   }

   addCart(Id) {
      const Product = this.state.data.find((elem) => elem.id === Id);

      const { id, name, image_url } = Product;

      // console.log(id, name, image_url);

      // const newObject = { id, name, image_url }


      const newArr = [id, name, image_url]

      // this.setState({ cart: this.state.cart.push(id) });

      this.setState({
         cart: this.state.cart.concat([newArr]),
         isEmpty: 'false'
      }, this.counterHandler);


      // this.setState({ cart: [...this.state.cart, ...newArr] });


      // this.setState({
      //   cart: this.state.cart.push(newObject)
      // })

      // console.log('STATE', this.state.cart);
   }

   counterHandler = () => {
      this.setState({
         total: this.state.cart.reduce((acc, currentValue) => {
            console.log('ACC', acc)
            console.log('currentValue', currentValue)
            return Number(acc) + Number(currentValue[0])
         }, 0)
      })
      // }, () => { console.log(this.state.total) })

   }

   deleteHandler(index) {
      // console.log('delete', index);
      this.state.cart.splice(index, 1)
      this.setState(
         (prevState) => ({ cart: [...prevState.cart] }),
         // () => { console.log(this.state.total) }
         this.counterHandler
      )
      // console.log('Новое', this.state.cart);
   }

   render() {
      return (
         <>
            <div className="container">
               <h1>Каталог Товаров</h1>

               <hr />


               <button className="btn green" onClick={
                  () => {
                     this.setState({ modal: true })
                  }
               }>Корзина</button>
               <button className="btn blue" onClick={() => this.setState({ modalReg: true })}>Регистрация</button>
               <hr />

               <div className="row">

                  {this.state.data.length ?
                     this.state.data.map((elem, index) => (
                        <div className="col s3 offset-s1" key={index}>
                           <div className="card">
                              <div className="card-image">
                                 <img src={elem.image_url} />
                                 <span className="card-title red-text">{elem.name}</span>
                              </div>
                              <div className="card-content">
                                 <p>99 $</p>
                              </div>
                              <div className="card-action">
                                 <label>
                                    <input type="checkbox" onChange={() => this.addCart(elem.id)} />
                                    <span>Add to cart</span>
                                 </label>
                              </div>
                           </div>
                        </div>
                     ))

                     :
                     <h3 className="grey-text">No products</h3>
                  }
               </div>

            </div>

            { this.state.modal ? <Cart
               close={() => this.setState({ modal: false })}
               cart={this.state.cart}
               isEmpty={this.state.isEmpty}
               total={this.state.total}
               deleteHandler={this.deleteHandler}
            // counterHandler={this.counterHandler}
            /> : null}

            { this.state.modalReg ? <Registration close={() => this.setState({ modalReg: false })} /> : null}

         </>

      )
   }
}