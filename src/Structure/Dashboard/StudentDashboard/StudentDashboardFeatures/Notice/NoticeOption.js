import React from 'react';
import { Link } from 'react-router-dom';
import notice from '../../../../images/icons/notices.png';
import StudentHeader from '../../StudentHeader';
const NoticeOption = () => {
    return (
        <div>
            <StudentHeader />
            <section class="container">

                <div class="row mx-auto mt-5">

                    <Link to='/student-notice-list?type=2' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={notice} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">School Notice</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <Link to='/student-notice-list?type=1' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={notice} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Teacher Notice</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>

                </div>
            </section>
        </div>
    );
};

export default NoticeOption;