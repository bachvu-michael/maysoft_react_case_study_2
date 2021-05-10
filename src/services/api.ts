import React from "react";

const EmployeesComponent = () => {
    const [employees, setEmployees] = React.useState(
        undefined
      );
      
    const fetchEmployees = async (page: number) => {
        const apiUrl = `https://6093bbe7a7e53a0017951709.mockapi.io/Employees?page=${page}&limit=5`;
        fetch(apiUrl).then(async (res) => {
            if (res.ok) {
                setEmployees(await res.json());
            }
        });
    };
}
export default EmployeesComponent;