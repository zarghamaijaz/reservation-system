import { API_URL } from "./constant";
import request from "./request";


export function adminLoginAPI(data){
  return request({
    url: `${API_URL}/admin/login`,
    method: "POST",
    data
  })
}
export function loginAPI(data) {
  const { username, password } = data;

  // Actual API
  return request({
      url: `${API_URL}/auth/login`,
      method: "POST",
      data
  })

  // Mock API
  const studentData = {
    username: "john",
    role: "student",
  };
  const signInstructorData = {
    username: "lisa",
    role: "sign-instructor",
  };
  const drivingInstructorData = {
    username: "dave",
    role: "driving-instructor",
  };
  const responseData = {
    success: true,
    data: null,
  };
  if (username === "john") {
    responseData.data = JSON.stringify(studentData);
  } else if (username === "lisa") {
    responseData.data = JSON.stringify(signInstructorData);
  } else if (username === "dave") {
    responseData.data = JSON.stringify(drivingInstructorData);
  } else {
    responseData.success = false;
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(responseData);
    }, 1000);
  });
}

// Customers
export function addNewCustomerAPI(data) {
  return request({
    method: "POST",
    url: `${API_URL}/students`,
    data,
  });

  const response = {
    success: true,
    message: "Customer added successfully",
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}
export function getCustomersListAPI() {
  return request({
    url: `${API_URL}/students`,
    method: "GET",
  });
  const responseData = {
    success: true,
    message: "Students list fetched",
    data: [
      {
        id: "databaseId_1",
        name: "Zargham",
        phoneNumber: "03238404499",
        category: "A1",
        carNoPlate: "9965",
        dateOfBirth: "1999-04-02",
        idCardNumber: "12345-1234-123-1",
        needTest: true,
        haveTest: "2025-07-01",
        visaExpire: "2025-07-01",
      },
      {
        id: "databaseId_2",
        name: "Usama",
        phoneNumber: "03238404410",
        category: "A1",
        carNoPlate: "9965",
        dateOfBirth: "1999-04-02",
        idCardNumber: "12345-1234-123-1",
        needTest: false,
        haveTest: "2025-07-01",
        visaExpire: "2025-07-01",
      },
    ],
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(responseData);
    }, 1000);
  });
}
export function getCustomerDetailsAPI(data) {
  return request({
    method: "GET",
    url: `${API_URL}/students/${data}`,
  });
  const response = {
    success: true,
    message: "Customer details fetched!",
    data: {
      name: "Zargham",
      idDigit: "9",
      idValue: "010203",
      category: "CE",
      carNoPlate: "55660",
      phoneNumber: "03174429967",
      // Sending UTC dated to simulate an actual mongodb response
      dateOfBirth: "2025-05-22T10:44:06.245+00:00",
      visaExpire: "2025-05-22T10:44:06.245+00:00",
      learningExpire: "2025-05-22T10:44:06.245+00:00",
      testStatus: "needtest1",
    },
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}
export function deleteCustomerAPI(data) {
  return request({
    method: "DELETE",
    url: `${API_URL}/students/${data}`,
  });
  const response = {
    success: true,
    message: "Customer details fetched!",
    data: {
      name: "Zargham",
      idDigit: "9",
      idValue: "010203",
      category: "CE",
      carNoPlate: "55660",
      phoneNumber: "03174429967",
      // Sending UTC dated to simulate an actual mongodb response
      dateOfBirth: "2025-05-22T10:44:06.245+00:00",
      visaExpire: "2025-05-22T10:44:06.245+00:00",
      learningExpire: "2025-05-22T10:44:06.245+00:00",
      testStatus: "needtest1",
    },
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}
export function updateCustomerDetailsAPI(customerId, data) {
  return request({
    method: "PUT",
    url: `${API_URL}/students/${customerId}`,
    data,
  });
  const response = {
    success: true,
    message: "Customer updated successfully",
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}
export function printNeedTestAPI() {
  return request({
    url: `${API_URL}/students/export/test-students`,
    method: "GET",
    responseType: "blob",
    withCredentials: true,
  });
}

// Customer Lessons

export function getCustomerLessonsAPI(customerId) {
  return request({
    method: "GET",
    url: `${API_URL}/lessons?studentId=${customerId}`,
  });
}
export function addCustomerLessonsAPI(customerId, data) {
  return request({
    method: "POST",
    url: `${API_URL}/lessons/${customerId}`,
    data,
  });
}

export function updateCustomerLessonsAPI(customerId, data) {
  return request({
    method: "PUT",
    url: `${API_URL}/lessons/${customerId}`,
    data,
  });
}

export function getProfitLossStatsAPI(data) {
  return request({
    method: "POST",
    url:`${API_URL}/expenses/reports/profit-loss`,
    data,
  })
  const response = {
    success: true,
    message: "Stats fetched successfully",
    data: {
      totalInvoicesIssued: 2000,
      totalExpensePaid: 1000,
      profit: 1000,
    },
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}
export function getVATStatsAPI(data) {
  return request({
    method: "POST",
    url:`${API_URL}/expenses/reports/vat`,
    data,
  })
  const response = {
    success: true,
    message: "Stats fetched successfully",
    data: {
      issued: {
        items: [
          {
            invoice: "00372",
            description: "Ali Ahmed",
            amount: "40000",
            vat: "7600",
          },
        ],
        total: {
          amount: 1190,
          vat: 190,
        },
      },
      expenses: {
        items: [
          {
            invoice: "00372",
            description: "Fuel",
            amount: "50",
            vat: "9",
          },
          {
            invoice: "00373",
            description: "Parts",
            amount: "200",
            vat: "36",
          },
          {
            invoice: "00374",
            description: "Fuel",
            amount: "50",
            vat: "9",
          },
        ],
        total: {
          amount: 1000,
          vat: 140,
        },
      },
    },
  };
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(response);
    }, 1000);
  });
}

// booking list
export function getBookingListByDateAPI(data) {
  return request({
    method: "POST",
    url: `${API_URL}/bookings/availability`,
    data,
  })
}
export function getMyBookingsAPI(data) {
  return request({
    method: "GET",
    url: `${API_URL}/bookings/my-bookings`,
    data,
  })
}
export function getUnpaidAmountAPI(studentId) {
  return request({
    method: "GET",
    url: `${API_URL}/students/${studentId}/unpaid-amount`,
  })
}

export function bookSlotAPI(data) {
  return request({
    url: `${API_URL}/bookings/book`,
    method: "POST",
    data,
  });
}
export function cancelBookingAPI(data) {
  return request({
    url: `${API_URL}/bookings/cancel/${data}`,
    method: "DELETE",
    data,
  });
}
export function changeBookingStatusAPI(data) {
  return request({
    url: `${API_URL}/booking/${data.id}`,
    method: "PUT",
    data,
  });
}
export function getBookingRequestsAPI() {
  return request({
    url: `${API_URL}/booking/`,
    method: "GET",
  });
}



// Expenses

export function getExpenseAPI(data){
  return request({
    method: "GET",
    url:`${API_URL}/expenses?start_date=${data.startDate}&end_date=${data.endDate}`,
    data,
  })
}
export function addMonthlyExpenseAPI(data){
  return request({
    method: "POST",
    url:`${API_URL}/expenses/monthly`,
    data,
  })
}
export function deleteMonthlyExpenseAPI(id){
  return request({
    method: "DELETE",
    url:`${API_URL}/expenses/monthly/${id}`,
  })
}
export function addDailyExpenseAPI(data){
  return request({
    method: "POST",
    url:`${API_URL}/expenses/daily`,
    data,
  })
}
export function deleteDailyExpenseAPI(id){
  return request({
    method: "DELETE",
    url:`${API_URL}/expenses/daily/${id}`,
  })
}

