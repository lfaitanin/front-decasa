import React, { Component} from 'react';
import {  getList ,addItem, updateItem, deleteItem } from './ListFunctions';


class List extends Component{
    constructor(){
        super();
        this.state ={
            id: '',
            name: '',
            price: '',
            description: '',
            editDisable: false,
            items: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        this.getAll()
    }
    onChange = e => {
        this.setState ({
            [e.target.name]: e.target.value
    
        })
    }
    getAll = () =>{
        getList().then(data => {
            this.setState({
                name: '',
                price: '',
                description: '',
                items:[...data]
            },
            () => {
                console.log(this.state.items)
            }
            )
        })
    }
    onSubmit = e => {
        e.preventDefault()
        addItem(this.state.name, this.state.price, this.state.description).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            price: '',
            description: ''
        })
    }
    onUpdate = e => {
        e.preventDefault()
        updateItem(this.state.name, this.state.price, this.state.description, this.state.id).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            price: '',
            description: '',
            editDisable: ''
        })
        this.getAll();
    }
    onEdit = (itemid, e ) =>{
        e.preventDefault()
        
        var data = [...this.state.items]
        data.forEach((item,index) =>{
            if(item.id === itemid){
                this.setState({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    editDisable: true

                })
            }
        })
    }
    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)
        this.getAll()
    }
    render() {
        return(
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Produtos</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input 
                                type="text" 
                                placeholder="Nome"
                                className="form-control"
                                id="name"
                                value={this.state.name || ''}
                                onChange={this.onChange.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input 
                                type="text" 
                                placeholder="Preço"
                                className="form-control"
                                id="price"
                                value={this.state.price || ''}
                                onChange={this.onChange.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input 
                                type="text" 
                                placeholder="Descrição"
                                className="form-control"
                                id="description"
                                value={this.state.description || ''}
                                onChange={this.onChange.bind(this)} 
                                />
                            </div>
                        </div>
                    </div>
                 {!this.state.editDisable ? (
                     <button type="submit"
                     className="btn btn-sucess btn-block"
                     onClick={this.onSubmit.bind(this)}>
                        Cadastrar
                     </button>
                 ) : (
                     ''
                 )}
                 {this.state.editDisable ? (
                    <button type="submit" 
                    onClick={this.onUpdate.bind(this)}
                    className="btn btn-primary btn-block">
                    Atualizar  
                    </button>
                 ) : (
                     ''
                 )}  
                </form>

                <table className="table">
                    <tbody>
                    {this.state.items.map((item, index) => (                            
                            <tr key={index}>
                                <td className="text-left">{item.title}</td>
                                <td className="text-right">
                                    <button href=""
                                    className="btn btn-info mr-1"
                                    disable={this.state.editDisable}
                                    onClick={this.onEdit.bind(
                                        this,
                                        item.id

                                    )}>
                                    Editar
                                    </button>
                                    <button href=""
                                    className="btn btn-danger"
                                    disable={this.state.editDisable}
                                    onClick={this.onEdit.bind(
                                        this,
                                        item.id

                                    )}>
                                    Editar
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default List