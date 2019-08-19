import React, {Component} from 'react'
import './App.css';
import PatientList from './Components/PatientList';
import PatientMedications from './Components/PatientMedications';

class PatientView extends Component {

  constructor(props)
    {
        super(props);

        this.state = {
          items: [],
          SelectedPatientId : null,
        }

        this.handleTempChange = this.handleTempChange.bind(this);
        this.handlePulseChange = this.handlePulseChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTempChange(event) {
      var arr = this.state.items;
      arr.temperature = event.target.value;
      this.setState({items : arr});
    }

    handlePulseChange(event) {
      var arr = this.state.items;
      arr.pulse = event.target.value;
      this.setState({items : arr});
    }

    PatientSelected = (e) => {
          this.setState({SelectedPatientId : e.target.value});
           
          fetch("http://localhost:3002/Patients/TempPulse/"+e.target.value,{ method:'Get'})
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

    handleSubmit(event) {
      event.preventDefault();
     
      fetch("http://localhost:3002/Patients/"+this.state.SelectedPatientId,{ method:'PATCH', 
            body: JSON.stringify(this.state.items) , 
                headers: {
			              "Content-type": "application/json; charset=UTF-8"
		    	  }})
            .then(res => res.json())
            .then(
                (result) => {
                      alert("Patient record updated...")
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
      <form onSubmit={this.handleSubmit}>
        <div className="App">
        <header className="App-header">
          <div>
            <PatientList PatientSelected={this.PatientSelected} ></PatientList>
            <PatientMedications SelectedPatientId={this.state.SelectedPatientId}> </PatientMedications>
            Temperature: <input type="text" value={this.state.items.temperature} onChange={this.handleTempChange}></input> <br/>
            Pulse: <input type="text" value={this.state.items.pulse} onChange={this.handlePulseChange}></input> <br/>
            <input type="submit" value="Update Temp/Pulse" />
          </div>
        </header>
      </div> 
    </form>
  );
  
}

}


export default PatientView;
