import axios from 'axios';

export const getList = () => {
    return axios
    .get('/api/products',{
        headers: {'Content-Type': 'application/json'}
    })
    .then(res =>{
        return res.data
    }) 
}

export const addItem = (name, price, description) => {
    return axios
    .post('/api/products',
    {
        name: name,
        price: price,
        description: description
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res =>{
        console.log(res);
    })
}
export const deleteItem = id => {
        axios.delete('api/products/${id}', {
            headers: {'Content-Type': 'application/json'}

        })
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err)
        })
}
export const updateItem = (name,price,description,id) => {
    return axios
    .put('api/products/${id}',{
        
            name: name,
            price: price,
            description: description
        
    },
    {
        headers: {'Content-Type': 'application/json'}
    
    })

    .then(res =>{
        console.log(res);
    })
    .catch(err =>{
        console.log(err)
    })
}