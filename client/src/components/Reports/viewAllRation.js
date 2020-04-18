import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllRations,
} from "../../_actions/rationAction";
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactToExcel from "react-html-table-to-excel";

const RationMaster = ({
    getAllRations,
    allRations,

}) => {
    useEffect(() => {
        getAllRations();
        //eslint-disable-next-line
    }, [getAllRations]);


    const [state, setState] = useState({
        sortDate: [],
        isToggle: false,
    })
    const { sortDate, isToggle } = state;


    const datesort1 = (e) => {
        let newDateSort = allRations
        if (isToggle == false) {
            newDateSort.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        } else {
            newDateSort.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        }
        setState({

            sortDate: newDateSort
        })
    }



    const datesort = (e) => {
        setState({
            isToggle: !isToggle,
        })
        datesort1()
    }
    console.log(sortDate);

    return (
        <Fragment>
            <div className="container-fluid  pb-4 mb-4">

                <section className=" mt-2  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Total Kit Delivered</h2>

                                <p><strong>1 Kit =</strong> <em>( 5 kg rice, 5 kg flour, 1 kg sugar, 1 kg masoor daal, 1 kg onions,1kg potatoes, 1 kg chana, 1 turmeric powder, 1 red chilli powder, 1 scrub, 250 gm tea, 1 kg refined oil, 1 paparr packet,1 packet Salt) </em> </p>
                                <br />
                                <div className="row">

                                    <table className="table table-hover table-sm mt-2" id="table-inv">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col" onClick={datesort} >Date</th>
                                                <th scope="col">Kit Delivered</th>
                                                <th scope="col">Desc</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allRations.map(ration => (
                                                <tr key={ration._id}>
                                                    <td>{moment(ration.date).format("DD-MM-YYYY")}</td>
                                                    <td>{!ration.rationKit ? "NA" : ration.rationKit}</td>
                                                    <td>{!ration.desc ? "NA" : ration.desc}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div></div>

                        <ReactToExcel
                            className=" btn btn-danger "
                            table="table-inv" // id of table which you want to export
                            filename={`Rat-${Date.now()}`} // name of the file 
                            sheet="sheet"
                            buttonText="Export Table" // button name 
                        />

                    </div>


                </section>
            </div>
        </Fragment>
    );
};

RationMaster.propTypes = {
    getAllRations: PropTypes.func.isRequired,
    allRations: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    allRations: state.ration.allRations,
    filtered: state.ration.filtered,
    loading: state.ration.loading
});
export default connect(
    mapStateToProps,
    { getAllRations }
)(RationMaster);




// const datesort1 = (e) => {
//     let newDateSort = allRations
//     if (isOldestFirst) {
//         newDateSort.sort((a, b) => a.amount - b.amount)
//     } else {
//         newDateSort.sort((a, b) => b.amount - a.amount)
//     }
//     setState({
//         isOldestFirst: false,
//         sortDate: newDateSort
//     })
// }