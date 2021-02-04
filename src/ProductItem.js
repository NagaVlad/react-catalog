import React, { Component } from 'react'

class ProducItem extends Component {
  constructor(props) {
    const { pd, innerRef, changeProductItemCheckedStatus } = props
    super(props)
    this.state = {
      ref: pd.ref,
    }
  }
  onChangeHandler = (func, obj) => {
    func(obj)
  }
  render() {
    const {
      pd,
      innerRef,
      changeProductItemCheckedStatus,
      isChecked,
    } = this.props
    return (
      <div className='col s3 offset-s1'>
        <div className='card'>
          <div className='card-image'>
            <img src={pd.image_url} alt='' />
            <span className='card-title black-text'>{pd.name}</span>
          </div>
          <div className='card-content'>
            <p>Цена {pd.id}</p>
          </div>
          <div className='card-action'>
            <label>
              <input
                checked={isChecked}
                ref={this.state.ref}
                type='checkbox'
                onChange={() => {
                  this.onChangeHandler(changeProductItemCheckedStatus, {
                    id: pd.id,
                    isChecked: this.state.ref.current.checked,
                    input: this.state.ref,
                  })
                }}
              />
              <span>Добавить в корзину</span>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default ProducItem
// (e) => {
//   console.log(innerRef)
// changeProductItemCheckedStatus({
//   id: pd.id,
//   isChecked: innerRef.current.checked,
// })
// }
