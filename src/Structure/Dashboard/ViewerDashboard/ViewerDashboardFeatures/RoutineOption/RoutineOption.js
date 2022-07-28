import React from 'react';
import student from '../../../../images/icons/student.png';
import teacher from '../../../../images/icons/teacher.png';
import ViewerHeader from '../../ViewerHeader';

const RoutineOption = () => {
    return (
        <>
            <ViewerHeader />

            <section class="container">
                <div class="row mx-auto mt-5">

                    <a href='/viewershowstudentroutine' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={teacher} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">View Teacher Routine</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='/teacherdata' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={student} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Student Routine</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>

                </div>
            </section>
        </>
    );
};

export default RoutineOption;