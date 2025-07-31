import { API_URL } from "./constant";
import request from "./request";

export function loginAPI(data){
    const { username, password } = data;
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

export function getMyInfoAPI(){

}

export function getStudentsListAPI(){
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