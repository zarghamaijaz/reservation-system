import { API_URL } from "./constant";
import request from "./request";

export function loginAPI(data){
    const { username, password } = data;
    
    // Actual API
    return request({
        url: `${API_URL}/auth/login`,
        method: "POST",
        data
    })

    // Mock API
    const studentData = {
        username: 'john',
        role: 'student'
    };
    const signInstructorData = {
        username: 'lisa',
        role: 'sign-instructor'
    };
    const drivingInstructorData = {
        username: 'dave',
        role: 'driving-instructor'
    };
    const responseData = {
        success: true,
        data: null,
    }
    if(username === 'john'){
        responseData.data = studentData;
    }
    else if(username === 'lisa'){
        responseData.data = signInstructorData;
    }
    else if(username === 'dave'){
        responseData.data = drivingInstructorData;
    }
    else{
        responseData.success = false;
    }

    return new Promise ((res, rej) => {
        setTimeout(()=>{
            res(responseData);
        }, 1000);
    })
}
export function addNewStudentAPI(data){
    return request({
        url: `${API_URL}/auth/addNewStudent`,
        method: "POST",
        data,
    })
}
export function changePasswordAPI(data){
    return request({
        url: `${API_URL}/auth/changePassword`,
        method: "POST",
        data,
    })
}

export function getMyInfoAPI(){

}

export function getStudentsListAPI(){
    return request({
        url: `${API_URL}/auth/students`,
        method: "GET",
    });
    const responseData = {
        success: true,
        message: "Students list fetched",
        data:[
            {
                id: "databaseId_1",
                name: "Zargham",
                username: "zargham",
                phoneNumber: "03238404499",
                dateOfBirth: "1999-04-02",
                idCardNumber: "12345-1234-123-1",
            },
            {
                id: "databaseId_2",
                name: "Osama",
                username: "osama",
                phoneNumber: "03238404500",
                dateOfBirth: "1999-04-02",
                idCardNumber: "12345-1234-123-1",
            },
            {
                id: "databaseId_3",
                name: "Mafooq",
                username: "mafooq",
                phoneNumber: "03238404501",
                dateOfBirth: "1999-04-02",
                idCardNumber: "12345-1234-123-1",
            },
            {
                id: "databaseId_4",
                name: "John",
                username: "john",
                phoneNumber: "03238404502",
                dateOfBirth: "1999-04-02",
                idCardNumber: "12345-1234-123-1",
            },
        ]
    };
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res(responseData);
        }, 1000,)
    })
}

export function getTimingsByDayAPI(day){
    let data = [];
    if(day === "Monday"){
        data = [
            {
            startTime: "09:00",
            endTime: "10:00",
            },
            {
            startTime: "10:30",
            endTime: "11:30",
            },
        ]
    }
    const responseData = {
        success: true,
        message: "Students list fetched",
        data,
    };
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res(responseData);
        }, 1000)
    })
}
// booking list
export function getBookingListByDateAPI(date){
    let data = [];
        data = [
            {
                _id: "1",
                startTime: "04:00",
                endTime: "5:00",
            },
            {
                _id: "2",
                startTime: "6:00",
                endTime: "7:30",
            },
            {
                _id: "3",
                startTime: "9:00",
                endTime: "10:00",
            },
        ]
    const responseData = {
        success: true,
        message: "Students list fetched",
        data,
    };
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res(responseData);
        }, 1000)
    })
}

export function bookSlotAPI(data){
    return request({
        url: `${API_URL}/booking/`,
        method: "POST",
        data
    })
}
export function changeBookingStatusAPI(data){
    return request({
        url: `${API_URL}/booking/${data.id}`,
        method: "PUT",
        data
    })
}
export function getBookingRequestsAPI(){
    return request({
        url: `${API_URL}/booking/`,
        method: "GET",
    })
}



export function getAssignedLessonsApi(){
    const responseData = {
        success: true,
        message: "Students list fetched",
        data:[
                {   id:1,
                    description:"Descriptions from mock api",
                    date:"06/08/2025",
                    timeFrom:"02:00",
                    timeTo:"03:30",
                    amount:300,
                    isPaid:true,
                },
                {   id:2,
                    description:"Descriptions from mock api 2",
                    date:"06/08/2025",
                    timeFrom:"02:00",
                    timeTo:"03:30",
                    amount:200,
                    isPaid:true,
                },
                {   id:3,
                    description:"Descriptions from mock api 3",
                    date:"06/08/2025",
                    timeFrom:"02:00",
                    timeTo:"03:30",
                    amount:400,
                    isPaid:false,
                },
        ]
    }
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res(responseData);
        }, 1000)
    })
}