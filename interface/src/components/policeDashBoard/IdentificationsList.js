import React from 'react'

function IdentificationsList(props) {
    let identifications = props.identifications
    //identifications.sort()
    //var arrayToSort = res.data.desc.slice(0)
    identifications.sort(function(a,b) {
        var x = a.date;
        var y = b.date;
        return x > y ? -1 : x < y ? 1 : 0;
    });
    return (
        <div>
            <br/>
            <b>Identifications</b><br/><br/>
            <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" style={{width : '100%'}}>
                <thead>
                    <tr>
                    <th className="mdl-data-table__cell--non-numeric">Date</th>
                    <th className="mdl-data-table__cell--non-numeric">Time</th>
                    <th className="mdl-data-table__cell--non-numeric">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        identifications.map(identification => {
                            return <tr key={JSON.stringify(identification)}>
                                <td className="mdl-data-table__cell--non-numeric">{identification.date}</td>
                                <td className="mdl-data-table__cell--non-numeric">{identification.time}</td>
                                <td className="mdl-data-table__cell--non-numeric">{identification.location}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default IdentificationsList
