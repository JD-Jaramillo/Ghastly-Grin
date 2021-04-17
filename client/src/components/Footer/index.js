import React from 'react';
import './Footer.css';


function Footer() {
    return (

        <div className='main-footer'>
            <div className='lilfoot'>

                <div className='row'>
                    {/* column1 */}
                    <div className='col'>
                        <h4></h4>
                        <ul className='list-unstyled'>

                        </ul>
                    </div>
                    {/* column2 */}
                    <div className='col'>
                        <h4 className='#'>
                            <ul className='list-unstyled'>
                                {/* <li></li>
                                <li></li>
                                <li></li> */}

                            </ul>


                        </h4>

                    </div>
                    {/* colum3 */}
                    <div className='#'>
                        <h4 className='#'>
                            <ul className='list-unstyled'>
                                {/* <li> </li>
                                <li></li>
                                <li></li> */}


                            </ul>


                        </h4>

                    </div>
                    <hr />
                    <div className='row'>
                        <p className='col-sm'>

                        </p>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Footer; 