import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading...');
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            toast.error('RazorPay SDK failed to load');
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector('POST', COURSE_PAYMENT_API, {
            courses
        }, {
            Authorisation: `Bearer ${token}`
        })

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log('COURSE PAYMENT API RESPONSE...', orderResponse)
        //option
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: 'StudyNotion',
            description: 'Thank you for purchasing the course',
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: `${userDetails.email}`
            },
            handler: function (response) {
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                //verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on('payment.failed', function (response) {
            toast.error('payment failed')
            console.log(response.error)
        })

    } catch (error) {
        console.log('PAYMENT API ERROR...', error.message);
        toast.error('Error while buying corse');
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        const apiResponse = await apiConnector('POST', SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay.order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorisation: `Bearer ${token}`
        })
        console.log('SEND PAYMENT SUCCESS EMAIL API RESPONSE...', apiResponse)
    } catch (error) {
        console.log('PAYMENT SUCCESS EMAIL ERROR...', error.message);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading('Verifing Payment...');
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector('POST', COURSE_VERIFY_API, bodyData,
            {
                Authorisation: `Bearer ${token}`
            })
        if (!response) {
            throw new Error(response.data.message);
        }
        console.log('COURSE VERIFY API RESPONSE...', response)
        toast.success('Payment Successful, you are enrolled in the course');
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart())
    } catch (error) {
        console.log('PAYMENT SUCCESS EMAIL ERROR...', error.message);
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}