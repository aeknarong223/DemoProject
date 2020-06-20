import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        }
    }
    componentDidMount(){
        this.getProducts();
      }

    getProducts = _ => {
        fetch('http://localhost:4000/products')
          .then( response => response.json())
          .then(response => this.setState({ products: response.data}))
          .catch(err => console.error(err))
      }

    updateProduct(userid) {
        const { products } = this.state;
        fetch(`http://localhost:4000/products/update?id=${userid}&name=${this.state.name}&price=${this.state.price}`)
          .then(response => response.json())
          .then(this.getProducts)
          .then(result=>{
            this.setState({
              response:result,
              products:products.filter(product=>product.Uid !== userid)
            })
          })
      }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            msg: nextProps.msg,
        });
    }

    titleHandler(e) {
        this.setState({ name: e.target.value });
    }

    msgHandler(e) {
        this.setState({ price: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="App" aria-hidden="true">
                <h2 className="App">Edit Product</h2>
                <div className="App">

                    <input type='text' onChange={this.titleHandler.bind(this)}/>

                    <Button variant="danger" onClick={()=> setMadalIsOpen(false)}>Close</Button>

                    <Button variant="secondary" 
                     onClick={()=>{ if(window.confirm('Are you sure to update this record?'))
                     {this.updateProduct();this.refreshPage()};}}>Update</Button>
                </div>
            </div>
        );
    }
}

export default Modal;