import React from 'react'
import Cart from './Cart'
import Registration from './Registration'
import './App.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Search from './Search'
import ProductFilter from './Filter/ProductFilter'
// import ProductItem from './ProductItem'
import About from './About'
import Main from './Main'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Modal from './Modal'

import ProductLayout from './ProductLayout'
import HomeLayout from './HomeLayout'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      modalReg: false,
      cart: [],
      isEmpty: 'true',
      total: 0,
      itog: [], //То что в дате
      offset: 0,
      // data: [],
      perPage: 9,
      currentPage: 0,
      postData: [],
      slice: [], //Пагинация
      checkChecked: [],
      searchProducts: [], //Найденный продукт
      searchString: '',
      startArraySearch: [], //Все товары
      modal2: true,
      //ФИЛЬТР
      series: 0,
      abv: 12,
      checked2: false,
      filtredProduct: [],
      /////////////////
      data: [],
      filtredByNameData: [],
    }

    this.handleFormInputFilter = this.handleFormInputFilter.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
  }

  componentDidMount() {
    this.receivedData()
    this.searching()
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected
    const offset = selectedPage * this.state.perPage
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData()
      }
    )
  }

  async receivedData() {
    let { data } = await axios.get(`https://api.punkapi.com/v2/beers`)
    data = data.map((el) => ({
      ...el,
      isChecked: false,
      ref: React.createRef(),
    }))
    this.setState(
      {
        data,
        filtredByNameData: data,
      },
      () => this.handlerRef()
    )
  }

  changeProductItemCheckedStatus = ({ id, isChecked, input }) => {
    // console.log((input.current.checked = isChecked))
    const productItem = this.state.filtredByNameData.find((el) => el.id === id)
    // const globalIndex = this.state.filtredByNameData.indexOf(productItem)
    productItem.isChecked = isChecked
    if (isChecked) {
      this.state.cart.push(productItem)
    } else {
      const index = this.state.cart.indexOf(productItem)
      if (index > -1) {
        this.state.cart.splice(index, 1)
      }
    }
    this.setState(
      (prevState) => ({
        filtredByNameData: [...prevState.filtredByNameData],
        cart: [...prevState.cart],
      }),
      () => {
        input.current.checked = isChecked
      }
    )
  }

  handlerRef() {
    // const arrayRef = Array.from({
    //   length: this.state.filtredByNameData.length,
    // }).map(() => React.createRef())
    // this.setState({
    //   arrayRef,
    // })
  }

  counterHandler = () => {
    this.setState({
      total: this.state.cart.reduce((acc, currentValue) => {
        return Number(acc) + Number(currentValue[0])
      }, 0),
    })
  }

  deleteHandler2(index) {
    this.state.cart.splice(index, 1)
    this.setState(
      (prevState) => ({ cart: [...prevState.cart] }),
      this.counterHandler
    )
    console.log('Новое', this.state.cart)
  }

  //*ПОИСК
  handleChange = (e) => {
    console.log('e', e.target.value)
    this.setState(
      {
        searchString: e.target.value,
      },
      () => this.searching()
    )
  }

  searching() {
    let searchString = this.state.searchString.trim().toLowerCase()

    if (searchString.length > 0) {
      let filtredByNameData = this.state.data.filter((el) => {
        return el.name.toLowerCase().match(searchString)
      })

      this.setState(
        {
          filtredByNameData,
        },
        () => {
          this.handlerRef()
        }
      )
    } else {
      this.setState(
        {
          filtredByNameData: this.state.data,
        },
        () => this.handlerRef()
      )
    }
  }

  //*ФИЛЬТР
  handleFormInputFilter(abv, series) {
    this.setState({
      series: series,
      abv: abv,
    })
  }

  handleChangeFilter() {
    this.setState(
      (prevState) => ({ checked2: !prevState.checked2 }),
      () => {
        console.log(this.state.checked2)
      }
    )
  }

  render() {
    return (
      <>
        <div className='container '>
          <nav className='navig '>
            <ul className='navigation'>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <li>
                  <NavLink to='/'>Каталог товаров</NavLink>
                </li>
                <li>
                  <NavLink to='/about'>О магазине</NavLink>
                </li>
                <li>
                  <NavLink to='/main'>Контакты</NavLink>
                </li>
                <li>
                  <button
                    className='btn btn green'
                    onClick={() => {
                      this.setState({ modal: true })
                    }}>
                    Корзина
                  </button>
                </li>
                <li>
                  <button
                    className='btn btn blue'
                    onClick={() => this.setState({ modalReg: true })}>
                    Регистрация
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        </div>

        <h1 style={{ textAlign: 'center' }}>Каталог товаров</h1>
        <Search
          handleChange={this.handleChange}
          searchString={this.state.searchString}
        />

        {/* Router */}
        <Route
          path='/'
          exact
          render={() => (
            <HomeLayout
              filtredByNameData={this.state.filtredByNameData} //!!ТУТ ЕСТЬ ОШИБКА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              addToCart={this.addToCart}
              pageCount={this.state.pageCount}
              changeProductItemCheckedStatus={
                this.changeProductItemCheckedStatus
              }

              // pageCount={this.state.pageCount}
            />
          )}
        />
        <Route path='/about' exact component={About} />
        <Route path='/main' exact component={Main} />
        {/* Корзина */}
        {this.state.modal ? (
          <Cart
            close={() => this.setState({ modal: false })}
            cart={this.state.cart}
            changeProductItemCheckedStatus={this.changeProductItemCheckedStatus}
          />
        ) : null}

        {/* Форма регистрации */}
        {this.state.modalReg ? (
          <Registration close={() => this.setState({ modalReg: false })} />
        ) : null}

        {/* Фильтр */}
        <ProductFilter
          series={this.state.series}
          abv={this.state.abv}
          handleChangeFilter={this.handleChangeFilter}
          data={this.state.data}
          checked={this.state.checked}
        />

        {this.state.checked2 ? this.handleFiltred() : null}

        {/* <Modal
          modal2={this.state.modal2}
          setActive={this.setModalActive}
        /> */}
      </>
    )
  }
}
