import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInvestments, fetchInvestment } from "../../_actions/investmentAction";
import { getAllUsers } from '../../_actions/authAction'
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToExcel from "react-html-table-to-excel";
import Skeleton from "react-loading-skeleton";

const ViewAllInvestment = ({
    getAllInvestments,
    allinvestments,
    fetchInvestment,
    getAllUsers,
    users,
    filtered,
    loading,
    history
}) => {


    const [scroll, setScroll] = useState({
        limit: 9,
        page: 1
    });
    const [formData, setFormData] = useState({
        year: 0,
        id: "",
    });

    useEffect(() => {
        let { limit, page } = scroll;
        getAllInvestments(limit, page);
        getAllUsers();
        //eslint-disable-next-line
    }, [getAllInvestments, getAllUsers]);

    const fetch = () => {
        let { limit, page } = scroll;
        setScroll({ ...scroll, page: ++page });
        fetchInvestment(limit, page);
    };



    const [state, setState] = useState({
        sortDate: [],
        isToggle: false,
    })
    const { sortDate, isToggle } = state;


    const datesort1 = (e) => {
        let newDateSort = allinvestments
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




    return (
        <Fragment>
            <div className="container-fluid">
                <section className="container-fluid mt-2  justify-content-center ">

                    <div className="container ">
                        <h2 className="text-center pt-2"> View All Donations </h2>
                    </div>

                    <br />


                    <div className="container justify-content-center animated fadeIn">

                        <InfiniteScroll
                            dataLength={allinvestments.length}
                            next={fetch}
                            hasMore={true}
                            loader={<p>Loading..</p>}
                        >
                            {allinvestments !== null && !loading ? (
                                <table className="table table-hover mt-2" id="table-inv">
                                    <thead className="thead-dark">
                                        <tr>

                                            <th scope="col">Amount(INR)</th>
                                            <th scope="col" onClick={datesort}>Date</th>
                                            <th scope="col">Donated By</th>
                                            <th scope="col">Recipt</th>
                                            <th scope="col">Added by</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {allinvestments.map(investment => (

                                            <tr key={investment._id}>
                                                <td>₹{`${investment.amount}`}<br />
                                                    <small className="text-danger">{`${Math.round((investment.amount / 785) * 10) / 10} Kit`}</small></td>
                                                <td>{moment(investment.date).format("DD-MM-YYYY")}</td>
                                                <td>{!investment.investor ? "Hidden" : investment.investor}</td>

                                                <td><a href={`${process.env.PUBLIC_URL}/uploads/${investment.image}`} target="_blank" >
                                                    <img src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`} alt={investment.image} className="profileImg"></img></a></td>


                                                <td>{`${investment.user.username}`}</td>

                                            </tr>


                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                    <div class="container">
                                        <Skeleton count={10} height={40} />
                                    </div>
                                )}
                        </InfiniteScroll>
                        <ReactToExcel
                            className=" btn btn-danger "
                            table="table-inv" // id of table which you want to export
                            filename={`Inv-${Date.now()}`} // name of the file 
                            sheet="sheet"
                            buttonText="Export Table" // button name 
                        />


                    </div>



                </section>
            </div>


        </Fragment>
    );
};

ViewAllInvestment.propTypes = {
    getAllInvestments: PropTypes.func.isRequired,
    fetchInvestment: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    allinvestments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    filtered: state.investment.filtered,
    loading: state.investment.loading,
    users: state.auth.users,
    allinvestments: state.investment.allinvestments,
});
export default connect(
    mapStateToProps,
    { getAllInvestments, getAllUsers, fetchInvestment }
)(ViewAllInvestment);


//{`${Math.round((investment.amount / 785) * 10) / 10}Kit`}