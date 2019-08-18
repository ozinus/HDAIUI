import React, {Component} from 'react'
import PropTypes from 'prop-types';

class PatientMedications extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            items : []
        }
    }

    
    componentWillReceiveProps(nextProps)
    {
        if ( nextProps.SelectedPatientId !== this.props.SelectedPatientId  )
        {
           fetch("http://localhost:3002/Patients/Medications/"+ nextProps.SelectedPatientId,{ method:'Get'})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                       items : result.Medications
                    });
                },
                (error) => {
                    this.setState({
                        error : error
                    });
                }
            )
        }
    }
    
    
    render()
    {
        return (
           
            <div >
            <   select style={{width:"250px"}} size="10" >
                    {this.state.items.map(item => (
                        <option value = {item.medname} >
                                {item.medname} {item.dose} {item.startDate} {item.stopDate} 
                        </option>
                    ))}
                </select>
            </div>
        );
    }

}
PatientMedications.popTypes = {
    SelectedPatientId: PropTypes.string.isRequired
}

export default PatientMedications;