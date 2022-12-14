import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import profile from "../../images/profile/profile.png";

const AcademicCalender = () => {
   const [inputDate, setInputDate] = useState('')
   const [topic, setTopic] = useState('')
   const [calender, setcalender] = useState([])
   const [show, setShow] = useState(true)
   const [add, setAdd] = useState(false)
   const [reset, setReset] = useState(0)
   const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
   const [user_code, setUser_code] = useState(localStorage.getItem("admin_code"));
   const [first_name, setFirst_code] = useState(localStorage.getItem("first_name"));
   const [school_id, setschool_code] = useState(localStorage.getItem("school_id"));
   const [last_name, setLast_code] = useState(localStorage.getItem("last_name"));
   const [id, setId] = useState('')
   const [showModal, setShowModal] = useState(false);
   const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);
   const [access_token, setAccess_token] = useState(
      localStorage.getItem("access_token"));
   const checkLoggedIn = () => {
      if (localStorage.getItem("user_type") != 4) {
         Navigate("/login");
      }
   };
   useEffect(() => {
      checkLoggedIn();
   }, []);

   const handleDate = e => {
      setInputDate(e.target.value)
      console.log(e.target.value)
      e.preventDefault()
   }

   const handleTopic = e => {
      setTopic(e.target.value)
      console.log(e.target.value)
   }

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_NODE_API}/api/calender/teacher?school_info_id=${school_id}`,
         {
            headers: {
               authorization: "bearer " + localStorage.getItem("access_token"),
            },
         }
      ).then((response) => {
         setcalender(response.data);
      });
   }, [topic, reset]);

   const handleSubmit = () => {
      fetch(`${process.env.REACT_APP_NODE_API}/api/calender`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "bearer " + localStorage.getItem("access_token"),
            },

            body: JSON.stringify({
               school_info_id: school_id,
               date: inputDate,
               topics: topic,
               id: id
            }),
         })
         .then((res) => res.json())
         .then((json) => {
            setReset(reset + 1)
            if (id === '') {
               toast('Academic Calendar saved successfully')
            } else {
               toast('Academic Calendar updated successfully')
            }
            console.log("ok");
         });

      setInputDate('')
      setTopic('')

   };
   const deleteCalender = async (id) => {
      const check = window.confirm('Are you sure to delete?');
      if (check) {
         axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
         const result = await axios.post(`${process.env.REACT_APP_NODE_API}/api/calender/delete?id=${id}`)
         if (result) {
            toast("Academic Calendar deleted successfully");
            setTopic(' ')
            setReset(reset + 1)
         }
      }
   }
   const editAcademic = (info) => {
      setAdd(true);
      setInputDate(info.date)
      setTopic(info.topics)
      setId(info.id)

   }
   const handleUpdate = () => {
      fetch(`${process.env.REACT_APP_NODE_API}/api/calender/update?id=${id}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("access_token"),
         },
         body: JSON.stringify({
            date: inputDate,
            topics: topic

         }),

      })
         .then((res) => res.json())
         .then((json) => {

            alert("Calender updated successfully!!")

         });
      setTopic('')
      setInputDate('')
   };

   return (
      <>
         <div style={{ height: "80px" }} className="bg-primary">
            <div
               style={{ display: "flex", justifyContent: "space-between" }}
               className="container"
            >
               <div>
                  <img
                     style={{ width: "50px" }}
                     className="pt-3"
                     src={profile}
                     alt=""
                  />
               </div>

               <div>
                  <h3
                     className=""
                     style={{
                        color: "white",
                        fontSize: "25px",
                        fontWeight: "bold",
                     }}
                  >
                     Name : {first_name} ({last_name})
                  </h3>
                  <h4
                     className=""
                     style={{
                        color: "white",
                        fontSize: "25px",
                        fontWeight: "bold",
                     }}
                  >
                     Admin Id: {user_code}
                  </h4>
               </div>
            </div>
         </div>

         <div className='container pt-4'>
            <div className='row'>
               <div className='col-md-12'>
                  <div className="card card-dark collapsed-card">
                     <div className="card-header">
                        <div className='d-flex justify-content-between px-4'>
                           <div>
                              <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Academic Calender</h3>
                           </div>
                           <div className="card-tools">
                              <button onClick={() => {
                                 setAdd(true)
                              }} id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus icons" /> Add Calender
                              </button>
                              {/* onClick={handlelist} */}
                              {/* active */}
                           </div>
                        </div>
                     </div>

                     <div className='card-body' >
                        {/* id='list' */}

                        {add ? (
                           <div className='row'>
                              <div class={"col-sm-4 p-2 mx-auto"}>
                                 <div class="form-group">
                                    <label className='pb-2' for="exampleInputEmail1">Schedule Type : </label>
                                    <input onChange={handleTopic} type="text" class="form-control" value={topic} />
                                 </div>
                              </div>
                              <div class={"col-sm-4 p-2 mx-auto"}>
                                 <div class="form-group">
                                    <label className='pb-2' for="exampleInputEmail1">Schedule Date : </label>
                                    <input onChange={handleDate} type="text" value={inputDate} class="form-control" />
                                 </div>
                              </div>
                              <div class={"col-sm-2 p-2 mx-auto"}>
                                 <div className='pt-2 mx-auto'>
                                    <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                                 </div>
                              </div>
                           </div>) : null
                        }






                     </div>

                  </div>
               </div>
            </div>


            {
               show ? (
                  <section className='py-5'>
                     <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Organization Information</h2>

                     <table class="table table-striped">
                        <thead>
                           <tr style={{ textAlign: 'center' }}>
                              <th scope="col">Schedule Type</th>
                              <th scope="col">Schedule Date</th>
                              <th scope="col">Edit</th>

                              <th scope="col">delete</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              calender.sort((a, b) => {
                                 return b.id - a.id;
                              }).map((info) => {


                                 return (
                                    <tr key={info.id}>
                                       <td style={{ textAlign: 'center' }}>{info.topics}</td>
                                       <td style={{ textAlign: 'center' }}>{info.date}</td>
                                       <td style={{ textAlign: 'center' }}>
                                          <button
                                             style={{ color: "white" }}
                                             className="bg-success"
                                             onClick={() => {
                                                handleShow()
                                                editAcademic(info)
                                             }}
                                          >
                                             Edit
                                          </button>
                                       </td>
                                       <td style={{ textAlign: 'center' }}>
                                          <button
                                             style={{ color: "white" }}
                                             className="bg-danger"
                                             onClick={() => deleteCalender(info.id)}
                                          >
                                             Delete
                                          </button>
                                       </td>
                                    </tr>
                                 )
                              })
                           }
                        </tbody>
                     </table>
                  </section>
               ) : null
            }

         </div>
         <Modal show={showModal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
               <Modal.Title>Update Calender</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Schedule Type</Form.Label>
                     <Form.Control
                        type="text"
                        value={topic}
                        onChange={handleTopic}
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlTextarea1"
                  >
                     <Form.Label>Schedule Date</Form.Label>
                     <Form.Control
                        type="text"
                        value={inputDate}
                        onChange={handleDate} />
                  </Form.Group>
               </Form>

            </Modal.Body>
            <Modal.Footer>
               <Button variant="danger" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={() => {
                  handleClose()
                  handleUpdate()
               }}>
                  Edit
               </Button>
            </Modal.Footer>
         </Modal>
      </>

   )
}

export default AcademicCalender