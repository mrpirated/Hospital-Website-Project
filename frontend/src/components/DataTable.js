import React from 'react';
import { Table } from 'react-bootstrap';

export default function DataTable(props) {
    var idx = 1;
    return (
        <div>
            {console.log(props.data)}
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    {
                        props.columns.map((column) => (
                            <th>{column.title}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.data.map((d) => (
                        <tr>
                            <td>{idx++}</td>
                            {
                                Object.keys(d).map(function(key, index) {
                                    return (
                                        <td>{d[key]}</td>
                                    )
                                })
                            }
                        </tr>
                    ))
                }   
                </tbody>
            </Table>
        </div>
    )
}
