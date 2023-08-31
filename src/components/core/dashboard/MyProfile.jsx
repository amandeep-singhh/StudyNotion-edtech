import React from 'react'
import { useSelector } from 'react-redux';
import EditBtn from '../../common/EditBtn';
import { useNavigate } from 'react-router-dom';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function MyProfile() {
    const { user } = useSelector((state) => state.profile);
    const navigate=useNavigate();
    const personalDetailsHeadings = [
        { heading: 'First Name', resHeading: 'firstName' },
        { heading: 'Last Name', resHeading: 'lastName' },
        { heading: 'Email', resHeading: 'email' },
        { heading: 'Phone Number', resHeading: 'contactNumber' },
        { heading: 'Gender', resHeading: 'gender' },
        { heading: 'Date of Birth', resHeading: 'dateOfBirth' },
    ]

   


    return (
        <div className='flex flex-col gap-5'>
            {/* my profile heading */}
            <h1 className='text-richblack-5 mb-9 font-medium text-3xl'>My Profile</h1>

            {/* profile pic div */}
            <div className='p-6 bg-richblack-700 rounded-lg flex flex-col md:flex-row gap-5 items-center '>
                {/* pic and email */}
                <div className='flex gap-6 flex-1 items-center'>
                    {/* pic */}
                    <img src={user.image} alt="profileIMG" className='aspect-square w-[4.625rem] rounded-full object-cover' />

                    {/* name and email */}
                    <div className='flex flex-col '>
                        <p className='font-semibold text-richblack-5 text-lg'>{user.firstName} {user.lastName}</p>
                        <p className='text-sm text-richblack-300 ' >{user.email}</p>
                    </div>
                </div>

                {/* edit button */}
                <div onClick={()=>navigate('/dashboard/settings')}>
                    <EditBtn />
                </div>

            </div>

            {/* about div */}
            <div className='p-6 bg-richblack-700 rounded-lg flex flex-col gap-5 '>
                {/* about heading */}
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-richblack-5 text-lg'>About</h2>
                    <div onClick={()=>navigate('/dashboard/settings')}>
                        <EditBtn />
                    </div>
                </div>

                {/* about  */}
                {user.additionalDetails.about ? <p className='text-richblack-300'>{user.additionalDetails.about}</p> : 
                <p className='text-richblack-300'>Write something about yourself</p>}

            </div>

            {/* personal details div */}
            <div className='p-6 bg-richblack-700 rounded-lg flex flex-col gap-5 '>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-richblack-5 text-lg'>Personal Details</h2>
                    <div onClick={()=>navigate('/dashboard/settings')}>
                        <EditBtn />
                    </div>
                </div>

                {/* personal details */}
                <div className='grid md:grid-cols-2 md:grid-rows-3 gap-x-1 gap-y-5'>
                    {personalDetailsHeadings.map((item, index) => {
                        return <div key={index} className='flex flex-col'>
                            <h4 className='text-richblack-300 text-sm'>{item.heading}</h4>
                            <p className={` text-sm text-richblack-5 font-medium`}>
                            
                            {index==4||index==5? user.additionalDetails[item.resHeading]?
                            user.additionalDetails[item.resHeading]:`We dont know your ${item.heading} :(`: 
                            user[item.resHeading]?user[item.resHeading]:`We dont know your ${item.heading} :(`}</p>
                        </div>
                    })}

                </div>

            </div>
        </div>
    )
}

export default MyProfile
