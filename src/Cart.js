import React from 'react'

export default class Cart extends React.Component {
  componentDidMount() {
    console.log('Корзина', this.props.cart)
  }
  render() {
    return (
      <>
        <div className='modal_wrap'>
          <div className='modal_window'>
            <i
              className='material-icons modal_close'
              onClick={this.props.close}>
              close
            </i>
            <h3>Корзина</h3>
            <hr />
            {/* {this.props.cart.length >= 1 ? this.setState({ isEmpty: 'false' }) : 'null'} */}
            {/* {this.props.isEmpty === 'false' ? null : <h3 className="grey-text">Нет добавленных продуктов</h3>} */}

            {this.props.cart.map((elem, index) => (
              // this.countTotal(elem[0])
              <div key={elem.id}>
                <div className='collection'>
                  <div className='collection-item row'>
                    <div className='col s6'>
                      Название: <h5>{elem.name}</h5>
                    </div>
                    <div className='col s3'>
                      Цена: <h5 className='red-text'>{elem.id}</h5>
                    </div>
                    <div className='col s3'>
                      <button
                        onClick={(e) => {
                          this.props.changeProductItemCheckedStatus({
                            id: elem.id,
                            isChecked: false,
                            input: elem.ref,
                          })
                        }}
                        className='btn red'>
                        Удалить
                      </button>
                    </div>
                    <h1>{index}</h1>
                  </div>
                </div>
              </div>
            ))}
            {/* <h4>Итоговая сумма: {this.props.total}</h4> */}
          </div>
        </div>
      </>
    )
  }
}
