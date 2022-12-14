import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import SchoolHeader from "../schoolHeader/SchoolHeader";
const SMSsent = (props) => {
    const [absentList, setAbsentList] = useState([])
    const [search_class_id, setSearchClass_id] = useState("");
    const [search_section_id, setSearchSection_id] = useState("");
    const [search_session_id, setSearchSession_id] = useState("");
    const [clses, setClses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sections, setSections] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState([]);
    const [smsText, setSmsText] = useState("");


    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = { ...prevState };
            newState[inputName] = !prevState[inputName];
            return newState;
        });
    };

    const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
            const newState = { ...prevState };
            for (const inputName in newState) {
                newState[inputName] = value;
            }
            return newState;
        });
    };
    // useEffect(() => {
    //     let allChecked = false;
    //     for (const inputName in checked) {
    //         if (checked[inputName] === false) {
    //             allChecked = false;
    //         }
    //     }
    //     if (allChecked) {
    //         setCheckedAll(true);
    //     } else {
    //         setCheckedAll(false);
    //     }
    // }, [checked]);

    useEffect(() => {

        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/section/all`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                setSections(response.data);
            });
    }, [search_class_id]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${localStorage.getItem('school_type')}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setClses(response.data);
            });
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/session`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setSessions(response.data);
            });
    }, [])

    let handleClassSearchChange = (e) => {
        setSearchClass_id(e.target.value);
    };
    let handleSectionSearchChange = (e) => {
        setSearchSection_id(e.target.value);
    };
    let handleSessionSearchChange = (e) => {
        setSearchSession_id(e.target.value);
    };

    const handleSearch = () => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student/filter?class_id=${search_class_id}&&section_id=${search_section_id}&&session_id=${search_session_id}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }
        ).then((response) => {
            let list = []
            for (const inputName in response.data) {
                list[inputName] = false;
            }
            for (const inputName in response.data) {
                response.data[inputName].status = 0;
            }

            setAbsentList(response.data);
            setChecked(list)
        });
    };
    const handleSmsSend = () => {

        let items = [...absentList];
        absentList.forEach((res, index) => {
            if (checked[index] === true) {
                fetch(`http://202.164.208.226/smsapi?api_key=C200164162b496a4b069b1.94693919&type=text&contacts=+880${res.mobile_no}&senderid=8809612441008&msg="${smsText}"`)

                fetch(`${process.env.REACT_APP_NODE_API}/api/save/smsReport`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify({
                        smsText: smsText,
                        user_id: localStorage.getItem('u_id'),
                        purpose: 1,
                        school_info_id: localStorage.getItem('school_info_id')
                    }),
                })
                    .then((res) => res.json())
                let item = { ...items[index] };
                item.status = 1
                items[index] = item
            }

        })

        setAbsentList(items);

        toast("SMS Sent successfully");
        setSmsText("")
        setChecked([])
        setCheckedAll(false)
    }
    return (
        <>
            <SchoolHeader />

            <div className='container pt-4'>

                <section className='py-5'>
                    <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card card-dark collapsed-card">
                                <div className='card-body' >
                                    <div className='row'>
                                        <div class={"col-sm-2 mx-auto p-2"}>
                                            <div class="form-group">
                                                <label className="pb-2" for="exampleSelect">
                                                    Class :{" "}
                                                </label>
                                                <select
                                                    style={{ border: "1px solid blue" }}
                                                    class="form-control"
                                                    value={search_class_id}
                                                    onChange={handleClassSearchChange}
                                                    id="class"
                                                    name="class"
                                                >
                                                    <option value="">Select Class</option>
                                                    {clses.map((classJSON) => {
                                                        return (
                                                            <option value={classJSON.id}>
                                                                {classJSON.class_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class={"col-sm-2 mx-auto p-2"}>
                                            <div class="form-group">
                                                <label className="pb-2" for="exampleSelect">
                                                    Section :{" "}
                                                </label>
                                                <select
                                                    style={{ border: "1px solid blue" }}
                                                    class="form-control"
                                                    value={search_section_id}
                                                    onChange={handleSectionSearchChange}
                                                    id="class"
                                                    name="class"
                                                >
                                                    <option value="">Select Section</option>
                                                    {sections.map((sectionJSON) => {
                                                        return (
                                                            <option value={sectionJSON.id}>
                                                                {sectionJSON.section_default_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class={"col-sm-2 mx-auto p-2"}>
                                            <div class="form-group">
                                                <label className="pb-2" for="exampleSelect">
                                                    Academic Session :{" "}
                                                </label>
                                                <select
                                                    style={{ border: "1px solid blue" }}
                                                    class="form-control"
                                                    value={search_session_id}
                                                    onChange={handleSessionSearchChange}
                                                    id="class"
                                                    name="class"
                                                >
                                                    <option value="">Select Session</option>
                                                    {sessions.map((sessionJSON) => {
                                                        return (
                                                            <option value={sessionJSON.id}>
                                                                {sessionJSON.session_year}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class={"col-sm-2 p-2"}>
                                            <div className='pt-2 mx-auto'>
                                                <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSearch}>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card card-dark collapsed-card">
                                <div className="card-header">
                                    <div className='d-flex justify-content-between px-1'>
                                        <div>
                                            <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">Create SMS</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body' >


                                    <div className='row'>
                                        <div class={"col-sm-12 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleSelect">SMS Text : </label>
                                                <textarea style={{ border: '1px solid blue' }} class="form-control" id="class" name="class" value={smsText} onChange={(e) => setSmsText(e.target.value)}>
                                                </textarea>

                                            </div>
                                        </div>
                                        <div class={"col-sm-2 p-2 mx-auto"}>
                                            <div className='pt-2 mx-auto'>
                                                <button style={{ color: 'white', fontSize: '20px' }} type="button" onClick={handleSmsSend} disabled={smsText === "" ? true : false} class="btn bg-secondary bg-gradient px-5">Submit</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <label class="custom-control custom-switch mt-3">
                                        <input onChange={(event) => selectAll(event.target.checked)}
                                            checked={checkedAll} className="form-check-input" type="checkbox" />
                                        <span class="px-2">Select All</span>
                                    </label>
                                </th>
                                <th scope="col">Student ID</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Mobile</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {absentList.map((res, index) => {
                                return <tr key={index}>
                                    <td>
                                        <th scope="col">
                                            <label class="custom-control custom-switch mt-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    onChange={() => toggleCheck(index)}
                                                    checked={checked[index]}
                                                />
                                                <span class=""></span>
                                            </label>
                                        </th>
                                    </td>
                                    <td>{res.student_code}</td>
                                    <td>{res.full_name}</td>
                                    <td>{res.mobile_no}</td>
                                    <td>{res.status === 0 ? 'pending' : 'send'}</td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </section>


            </div>
        </>
    )
}
export default SMSsent;