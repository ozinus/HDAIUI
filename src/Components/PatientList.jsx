import React, {Component} from 'react'

class PatientList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            items : []
        }
    }
    
    
    componentDidMount()
    {
        fetch("http://localhost:3002/Patients/",{ method:'Get'})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                       items : result
                    });
                },
                (error) => {
                    this.setState({
                        error : error
                    });
                }
            )
    }

    render()
    {
        return (
           
            <div >
            <select style={{width:"150px"}} size="10" onChange = {this.props.PatientSelected} >
                    {this.state.items.map(item => (
                        <option value = {item._id} key = {item._id}>
                                {item.firstName} {item.lastName}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

}

export default PatientList;