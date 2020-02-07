import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import uuid from 'uuid'

class App extends Component{
  state = {
    id: uuid(),
    item: '',
    items: [],
    editItem : false
  }
  handleChange = (e) => {
    this.setState({
      item : e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const newItem = {
      id: this.state.id,
      title : this.state.item
    }

    const updatedItems = [...this.state.items, newItem]

    this.setState({
      items : updatedItems,
      item : '',
      id: uuid(),
      editItem : false
    })
  }
  clearList = () => {
    this.setState({
      items:[]
    })
  }
  handleDelete = (id) => {
    const filtredItems = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: filtredItems
    })
  }
  handleEdit = id => {
    const filtredItems = this.state.items.filter(item => item.id !== id)
    const selectedItem = this.state.items.find(item => item.id === id)

    this.setState({
      items: filtredItems,
      item : selectedItem.title,
      editItem : true,
      id
    })

  }
  render() {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-4">
          <h3 className="text-capitalize text-center">todo input</h3>
          <TodoInput
           item={this.state.item} 
           handleChange={this.handleChange}
           handleSubmit = {this.handleSubmit}
           editItem={this.state.editItem}
            ></TodoInput>
          <TodoList items={this.state.items}
                    clearList={this.clearList}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}></TodoList>
        </div>
      </div>
    </div>
    </>
  );
  }
}

export default App;
