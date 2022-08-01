import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CreateNewExam = () => {
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState("");
    const [clses, setClses] = useState([]);
    const [cls, setCls] = useState("");

    const [sections, setSections] = useState([]);
    const [section, setSection] = useState("");

    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState("");

    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState("");

    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState("");

    const [date, setDate] = useState('')
    const [className_id, setclassName_id] = useState("");
    const [section_id, setSection_id] = useState("");
    const [subject_id, setSubject_id] = useState("");
    const [exam_id, setExam_id] = useState("");
    const [session_id, setSession_id] = useState("");
    const [fullMark, SetFullmark] = useState('');
    const [converted, SetConverted] = useState('');
    const [exam_info, SetExamInfo] = useState([])
    const [exam, setExam] = useState([])
    const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"));
    const [school_id, setSchool_id] = useState(localStorage.getItem("school_id"));


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/className?school_type_id=${school_type}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setClses(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_name`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setExam(response.data);
        });
    }, []);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/section/all`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setSections(response.data);

            });
    }, [className_id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setTeachers(response.data);
        });
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/session`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setSessions(response.data);
        });
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/subjects?className_id=${className_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setSubjects(response.data);
        });
    }, [className_id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_info?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            SetExamInfo(response.data);
        });
    }, [className_id, subject_id]);

    let handleTeacher = e => {
        setTeacher(e.target.value)
        console.log(e.target.value)
    }

    let handleclassNameChange = (e) => {
        setCls(e.target.value);
        setclassName_id(e.target.value);
        console.log(e.target.value)
    };
    let handleSectionChange = (e) => {
        setSection(e.target.value);
        setSection_id(e.target.value);
        console.log(e.target.value)
    };

    let handleSubjectChange = (e) => {
        setSubject(e.target.value);
        setSubject_id(e.target.value);
        console.log(e.target.value)
    };

    let handleDate = e => {
        setDate(e.target.value)
    }

    let handleSessionChange = (e) => {
        setSession(e.target.value);
        setSession_id(e.target.value);
        console.log(e.target.value)
    };

    let handlefullmark = (e) => {
        SetFullmark(e.target.value);
        console.log(e.target.value)
    };
    let handleExamType = (e) => {

        setExam_id(e.target.value)
        console.log(e.target.value)
    }

    let handleConverted = (e) => {
        SetConverted(e.target.value);
        console.log(e.target.value)
    };
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/exam_info`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: "bearer " + localStorage.getItem("access_token"), },
            body: JSON.stringify({

                section_id: section_id,
                school_info_id: school_id,
                className_id: className_id,
                subject_id: subject_id,
                exam_name_id: exam_id,
                session_id: session_id,
                full_marks: fullMark,
                converted_marks: converted,
                exam_date: date,
                teacher_id: teacher,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                alert('New exam Created Successfully!!')
            });
        setclassName_id('')
        setTeacher('')
        setDate('')
        setExam_id('')
        setSection_id('')
        setSession_id('')
        SetFullmark('')
        SetConverted('')
        setSubject_id('')
    };
    return (
        <section className='container'>
            <div className='row mt-4'>
                <div className=' col-md-12'>
                    <div className="card card-dark collapsed-card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between px-4'>
                                <div>
                                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} className="card-title pt-2">Create New Exam : </h3>
                                </div>
                                <div className="card-tools">
                                    <button id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus icons" />
                                    </button>
                                    {/* onClick={handlelist} */}
                                    {/* active */}
                                </div>
                            </div>
                        </div>

                        <div className='card-body' >
                            {/* id='list' */}

                            <div className='row'>


                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">Select Session : </label>
                                        <select
                                            className="form-control"
                                            value={session_id}
                                            onChange={handleSessionChange}
                                        >
                                            <option value="">Select</option>
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
                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">Exam Type : </label>
                                        <select
                                            className="form-control"
                                            value={exam_id}
                                            onChange={handleExamType}
                                        >
                                            <option value="">Select</option>
                                            {exam.map((classNameJSON) => {
                                                return (
                                                    <option value={classNameJSON.id}>
                                                        {classNameJSON.exam_name}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">className : </label>
                                        <select
                                            className="form-control"
                                            value={className_id}
                                            onChange={handleclassNameChange}
                                        >
                                            <option value="">Select</option>
                                            {clses.map((classNameJSON) => {
                                                return (
                                                    <option value={classNameJSON.id}>
                                                        {classNameJSON.className_name}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">Section : </label>
                                        <select
                                            className="form-control"
                                            value={section_id}
                                            onChange={handleSectionChange}
                                        >
                                            <option value="">Select</option>
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
                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">Subject : </label>
                                        <select
                                            className="form-control"
                                            value={subject_id}
                                            onChange={handleSubjectChange}
                                        >
                                            <option value="">Select</option>
                                            {subjects.map((subjectJSON) => {
                                                return (
                                                    <option value={subjectJSON.id}>
                                                        {subjectJSON.subject_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-sm-4 mx-auto p-2"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleSelect">Teachers : </label>
                                        <select
                                            className="form-control"
                                            value={teacher}
                                            onChange={handleTeacher}
                                        >
                                            <option value="">Select</option>
                                            {teachers.map((subjectJSON) => {
                                                return (
                                                    <option value={subjectJSON.id}>
                                                        {subjectJSON.full_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-sm-4 p-2 mx-auto"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleInputEmail1">Full Marks : </label>
                                        <input onChange={handlefullmark} style={{ border: '1px solid blue' }} type="text" className="form-control" value={fullMark} />
                                    </div>
                                </div>
                                <div className={"col-sm-4 p-2 mx-auto"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleInputEmail1">Converted Marks to Final Grade : </label>
                                        <input onChange={handleConverted} style={{ border: '1px solid blue' }} type="text" className="form-control" value={converted} />
                                    </div>
                                </div>
                                <div className={"col-sm-4 p-2 mx-auto"}>
                                    <div className="form-group">
                                        <label className='pb-2' for="exampleInputEmail1">Exam Date : </label>
                                        <input onChange={handleDate} style={{ border: '1px solid blue' }} type="date" className="form-control" value={date} />
                                    </div>
                                </div>
                                <div className={"col-sm-4 p-4 "}>
                                    <div className='pt-2 mx-auto'>
                                        <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" className="btn bg-info bg-gradient px-5">Create Exam</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='py-5'>
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Exam Lists</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Session</th>
                            <th scope="col">Exam Type</th>
                            <th scope="col">className</th>
                            <th scope="col">Section</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Full Marks</th>
                            <th scope="col">Converted Marks</th>
                            <th scope="col">Exam Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            exam_info.map((student) => {


                                return (
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{student.session_year}</td>
                                        <td style={{ textAlign: 'center' }}>{student.exam_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.className_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.section_default_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.subject_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.full_marks}</td>
                                        <td style={{ textAlign: 'center' }}>{student.converted_marks}</td>
                                        <td style={{ textAlign: 'center' }}>{student.exam_date}</td>






                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CreateNewExam