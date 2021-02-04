import React from 'react';
import Cart from './Cart';
import Registration from './Registration'
import './App.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Search from './Search'
import ProductFilter from './Filter/ProductFilter'
import ProductItem from './ProductItem'
export default class App extends React.Component {


   constructor(props) {
      super(props);
      this.state = {
         modal: false,
         modalReg: false,
         cart: [],
         isEmpty: 'true',
         total: 0,
         itog: [],
         offset: 0,
         data: [],
         perPage: 10,
         currentPage: 0,
         postData: [],

         checkChecked: [],
         arrayRef: []

      }

      this.deleteHandler = this.deleteHandler.bind(this)
      // this.handlePageClick = this.handlePageClick.bind(this);

   }



   handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;

      this.setState({
         currentPage: selectedPage,
         offset: offset
      }, () => {
         this.receivedData()
      });
   };

   receivedData() {
      axios
         .get(`https://api.punkapi.com/v2/beers`)
         .then(res => {

            const data = res.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)


            const arrayRef = Array.from({
               length: slice.length
            })
               .map(() => React.createRef())


            const postData = slice.map((pd, index) =>

               React.forwardRef((props, ref) => <ProductItem
                  // innerRef={this.state.arrayRef[index]}
                  innerRef={this.state.arrayRef[index]}
                  key={index}
                  pd={pd}
                  addCart={this.addCart}
               />
               ))

            this.setState({
               pageCount: Math.ceil(data.length / this.state.perPage),
               itog: data,
               postData,
               arrayRef
            })
         })
   }

   componentDidMount() {
      this.receivedData()
   }
   //ДОБАВЛЯЮ В КОРЗИНУ!!!!!!!!!!!!!!
   addCart = (Name, e, index) => {
      // console.log('СОСТОЯНИЕ ЧЕКБОКСА', e.target.getAttribute('data'));
      // console.log('СОСТОЯНИЕ ЧЕКБОКСА', e.target.getAttribute('data'));
      if (e.target.checked) {
         // console.log(Name);
         const Product = this.state.itog.find((elem) => {
            return elem.name === Name
         });

         //!!
         // const x = e.target.getAttribute('data')
         const { id, name, image_url } = Product;
         const newArr = [id, name, image_url]

         this.setState({
            cart: this.state.cart.concat([newArr]),
            isEmpty: 'false'
         }, this.counterHandler);
      } else {
         console.log('Удаляю');
         // console.log(this.state.cart.splice(index, 1));

         this.deleteHandler(index[0], e)



         // this.state.cart.splice(index[0], 1);
         // this.setState(
         //   (prevState) => ({ cart: [...prevState.cart] }),
         //   this.counterHandler
         // );
      }

   }

   counterHandler = () => {
      // console.log('ТОТАЛ', this.state.total)
      this.setState({

         total: this.state.cart.reduce((acc, currentValue) => {
            // console.log('ACC', acc)
            // console.log('currentValue', currentValue)
            return Number(acc) + Number(currentValue[0])
         }, 0)
      })
      // }, () => { console.log(this.state.total) })

   }

   deleteHandler(index, x) {
      // console.log('xxxxxxxx', x);
      // console.log(e);
      // if (e) {
      //   e.target.checked = false
      // }




      // console.log('delete', index);
      this.state.cart.splice(index, 1)

      this.setState(
         (prevState) => ({ cart: [...prevState.cart] }),
         // () => { console.log(this.state.total) }
         this.counterHandler
      )
      console.log('Новое', this.state.cart);
   }


   // getRef = (node) => { this.el = node }

   render() {
      return (
         <>
            <h1>Каталог товаров</h1>

            <div className="row">
               {this.state.postData}
            </div>


            <div className="row">
               {/* {this.state.itog} */}
            </div>

            <ReactPaginate
               previousLabel={"prev"}
               nextLabel={"next"}
               breakLabel={"..."}
               breakClassName={"break-me"}
               pageCount={this.state.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={this.handlePageClick}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"} />

            { this.state.modal ? <Cart
               close={() => this.setState({ modal: false })}
               cart={this.state.cart}
               isEmpty={this.state.isEmpty}
               total={this.state.total}
               deleteHandler={this.deleteHandler}
            /> : null}

            { this.state.modalReg ? <Registration close={() => this.setState({ modalReg: false })} /> : null}

            <button className="btn green" onClick={
               () => { this.setState({ modal: true }) }}>
               Корзина
          </button>

            <button className="btn blue" onClick={() => this.setState({ modalReg: true })}>Регистрация</button>

            <hr />

            {/* <div className="container" >
          <h3>Поиск товара</h3>
          <Search
            data={this.state.itog}
          />
        </div> */}

            <ProductFilter
               data={this.state.itog}
            />

         </>
      )
   }
}