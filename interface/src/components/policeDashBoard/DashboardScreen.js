import React, { Component } from 'react'
import NavBar from './NavBar'
import LeftPart from './LeftPart'
import IncidentReportCard from './IncidentReportCard'

export class DashboardScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            district : '',
            policeStation : '',
            searchValue : '',
            data : this.props.data,
            dataToDisplay : this.props.data,
        }
    }

    setSearchValue = (searchValue) => {
        let dataToDisplay = []
        let search = searchValue.toLowerCase()
        this.state.data.map(incident=>{
            if(
                incident.vehicleNumber.toLowerCase().startsWith(search) ||
                incident.subject.toLowerCase().includes(search)
            ){
                dataToDisplay.push(incident)
            }
        })

        this.setState({
            searchValue : searchValue,
            dataToDisplay : dataToDisplay
        })
    }

    setDistrict = (district) => {
        //choose only those with district = selected district
        let dataToDisplay = []
        this.state.data.map(incident=>{
            if(incident.district === district){
                dataToDisplay.push(incident)
            }
        })
        this.setState({
            district : district,
            dataToDisplay : dataToDisplay
        })
    }

    setPoliceStation = (policeStation) => {
        //choose only those with district = selected district
        if(policeStation === ''){
            this.setState({
                policeStation : policeStation
            })
        }
        else{
            let dataToDisplay = []
            this.state.data.map(incident=>{
                if(incident.localPoliceStation === policeStation){
                    dataToDisplay.push(incident)
                }
            })
            this.setState({
                policeStation : policeStation,
                dataToDisplay : dataToDisplay
            })
        }
    }

    clearFilters = () => {
        this.setState({
            district : '', policeStation : '', dataToDisplay : this.state.data
        })
    }

    removeClosedIncident = (incidentId) => {
        console.log(incidentId)
        let data = this.state.data
        data = data.filter((incident) => incident._id !== incidentId)
        console.log(data)
        this.setState({data : data, dataToDisplay : data},()=>{
            //redo filters based on new data
            if(this.state.district !== '')
                this.setDistrict(this.state.district)
            if(this.state.policeStation !== '')
                this.setPoliceStation(this.state.policeStation)
        })
    }

    render() {
        return (
           <React.Fragment>
               <NavBar setSearchValue={this.setSearchValue} from={this.props.from}/>
               <div className="dashboardBody">
                    <div className="pad20">
                        <LeftPart
                            district={this.state.district}
                            policeStation={this.state.policeStation}
                            setDistrict={this.setDistrict}
                            setPoliceStation={this.setPoliceStation}
                            clearFilters={this.clearFilters}
                            from={this.props.from}
                            //for user view control
                            userControlInfo={this.props.userControlInfo}
                        />
                        <div className="majorSeparator"></div>
                        <div className="rightSide">
                            {
                                this.state.dataToDisplay.length === 0 ?
                                    this.state.searchValue === '' ? 
                                    <div>No incidents reported : <b>{this.state.policeStation} {this.state.district}</b></div>
                                    :
                                    <div>
                                        No incidents matched your search. Please try again.<br/>
                                        <i>Currently, the search supports license plate number and subject line</i>
                                    </div>
                                :
                                this.state.dataToDisplay.map((datum, index) => {
                                    return <IncidentReportCard
                                        incident={datum}
                                        key={index + JSON.stringify(datum)}
                                        removeClosedIncident={this.removeClosedIncident}
                                        from={this.props.from}
                                    />
                                })
                            }
                        </div>
                    </div>
               </div>
           </React.Fragment>
        )
    }
}

export default DashboardScreen
