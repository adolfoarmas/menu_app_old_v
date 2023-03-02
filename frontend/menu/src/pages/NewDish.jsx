import styled from 'styled-components';   
import React, {useState, useEffect} from "react";
import getDishCategories from "../services/dishCategory/getDishCategories";

const NewDish = ({data={}, onSubmit}) => {

    const [formData, setFormData] = useState(data);
    const [categoriesList, setCategoriesList] = useState([])
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(()=> {
        getDishCategories()
        .then(categories => {
            setCategoriesList(categories)

            // set default values
            if(!data.hasOwnProperty('category')){
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    category: categories[0].id,
                  }));
            } 
        })
        
        setImagePreview(data.image)

    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (event) => {
        console.log(formData.valueOf('name'))
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // console.log({name, value})
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        formData.image = file

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setImagePreview(reader.result)
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
                <FormDiv>
                    <InputsDiv>
                        <h2>Add New Dish</h2>  
                        <FieldNameLabel>
                            <p>Name:</p>
                        </FieldNameLabel>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            {!formData.name ? <ErrorLabel>this field is required</ErrorLabel> : <ErrorLabel></ErrorLabel>}
                        <FieldNameLabel>
                            <p>Description:</p>
                        </FieldNameLabel>
                            <textarea className="App-text-form-description" id="description" name="description" value={formData.description} onChange={handleChange} required/>
                            {!formData.description ? <ErrorLabel>this field is required</ErrorLabel> : <ErrorLabel></ErrorLabel>}
                        <FieldNameLabel>
                            <p>Category:</p>
                        </FieldNameLabel>
                            <select id="caregory" name="category" value={formData.category} onChange={handleChange} required>
                                {categoriesList.map((cat, index) =>
                                    <option key={index} name="category" value={Number(cat.id)}>{cat.name}</option>
                                )}
                            </select>
                            {!formData.category ? <ErrorLabel>this field is required</ErrorLabel> : <ErrorLabel></ErrorLabel>}
                        <FieldNameLabel>
                            <p>Observation:</p>
                        </FieldNameLabel>
                            <textarea className="App-text-form-observation" id="observation" name="observation" value={formData.observation} onChange={handleChange}/>
                        <div className="new-dish-form-form-price">
                        <FieldNameLabel>
                            <p>Price:</p>
                            <input className="new-dish-form-form-price-price" type="number" id="price" name="price" value={formData.price} onChange={handleChange} required/>
                            {!formData.price ? <ErrorLabel>this field is required</ErrorLabel> : <ErrorLabel></ErrorLabel>}
                        </FieldNameLabel>
                        <FieldNameLabel>
                            <p>Currency:</p>
                            <input className="new-dish-form-form-price-currency" type="text" id="currency" name="currency" value={formData.currency} onChange={handleChange} required/>
                            {!formData.currency ? <ErrorLabel>this field is required</ErrorLabel> : <ErrorLabel></ErrorLabel>}
                        </FieldNameLabel>
                        </div>
                        <div>
                            <button type="submit">{data ? 'Update' : 'Create'}</button>
                        </div>
                    </InputsDiv>
                    <ImageFormDiv>
                        <FieldNameLabel className="new-dish-form-form-picture">
                            <p className="new-dish-form-form-picture-title">Picture:</p>
                        </FieldNameLabel>
                        <input type="file" id="image" name="image" onChange={handleFileChange} />
                        <img name="image" src={imagePreview} alt='dish selected file'/>
                    </ImageFormDiv>
                </FormDiv>
            </Form>
            
)
}

export default NewDish;

const ImageFormDiv = styled.div`
    display : flex;
    flex-direction: column;

    
`

const FieldNameLabel = styled.label`
    display : flex;
    flex-direction: column;
    p {
        margin: 0;
    }

`

const ErrorLabel = styled.label`
    font-size: 0.8em;
    color: #ff0000a2;
`

const InputsDiv = styled.div`
    display : flex;
    flex-direction: column;
    padding: 0 50px 0 0;
    width: 100%;

    input, textarea, select  {
        padding: 5px 5px;
        margin: 0;
        border: 0em solid #ccc;
        box-sizing: border-box;
    }

    /* input, textarea, select:hover {
        border: 1px solid #0099ff;
    } */
`

const FormDiv = styled.div` 
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 100%;
    padding: 20px 20px;
    background: inherit;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;  
    z-index: 999999999;
`

const Form = styled.form`

    display: flex;
    flex-direction: column;
    padding: 20px;
    max-width: 80%;


    @media only screen and (min-width: 768px) {

    .FormDiv {
      flex-direction: row;
    }

    }
    
    .InputsDiv .ImageFormDiv {
        flex-basis: 100%;
        margin: 10px;
    }
    
    @media only screen and (min-width: 768px) {
        .InputsDiv .ImageFormDiv {
        flex-basis: 50%;
        }
    }

`