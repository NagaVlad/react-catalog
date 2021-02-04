  addCart(Name) {

    this.setState({
      ch: !this.state.ch
    }, () => {
      console.log(this.state.ch)
          if (this.state.ch) {
      const Product = this.state.itog.find((elem) => {
        return elem.name === Name
      });
      const { id, name, image_url } = Product;
      const newArr = [id, name, image_url]
      this.setState({
        cart: this.state.cart.concat([newArr]),
        isEmpty: 'false',

      }, this.counterHandler);
    } else {
      this.deleteHandler(Name)
    }
    });


    // console.log(Name);
  }