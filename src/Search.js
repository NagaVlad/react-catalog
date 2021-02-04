import React from 'react'

class Search extends React.Component {
  state = {
    searchString: '',
  }

  render() {
    return (
      <div className='row'>
        <div className='container'>
          <i className='small material-icons'>search</i>
          <input
            style={{ borderTop: '0px solid black', padding: 5 }}
            type='text'
            value={this.props.searchString}
            onChange={(e) => this.props.handleChange(e)}
            placeholder='Введите название товара'
          />
          <label style={{ textAlign: 'center' }}>Строка поиска </label>
        </div>
      </div>
    )
  }
}

export default Search
