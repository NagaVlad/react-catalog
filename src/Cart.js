import React from "react";

export default class Cart extends React.Component {
  render() {
    return (
      <>
        <div className="modal_wrap">
          <div className="modal_window">
            <i
              className="material-icons modal_close"
              onClick={this.props.close}
            >
              close
            </i>
            <h3>Корзина</h3>
            <hr />
            {/* {this.props.cart.length >= 1 ? this.setState({ isEmpty: 'false' }) : 'null'} */}
            {/* {this.props.isEmpty === 'false' ? null : <h3 className="grey-text">Нет добавленных продуктов</h3>} */}
            {console.log("Корзина", this.props.cart)}
            {this.props.cart.map((elem, index) => {
              // this.countTotal(elem[0])
              return (
                <div key={elem[0]}>
                  {elem}
                  <div className="collection">
                    <div className="collection-item row">
                      <div className="col s6">
                        Название: <h5>{elem[1]}</h5>
                      </div>
                      <div className="col s3">
                        Цена: <h5 className="red-text">{elem[0]}</h5>
                      </div>
                      <div className="col s3">
                        <button
                          onClick={() => {
                            this.props.buttonDeleteClickHandler(elem[0]);
                          }}
                          className="btn red"
                        >
                          Удалить
                        </button>
                      </div>
                      <h1>{index}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
            <h4>Итоговая сумма: {this.props.total}</h4>
          </div>
        </div>
      </>
    );
  }
}
