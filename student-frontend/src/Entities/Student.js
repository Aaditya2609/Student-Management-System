class Student {
    studentId;
    studentName;
    mobile;
    semester;
    email;
    dateOfBirth;
    branch;
    addressLine;
    city;
    state;
    pincode;
    result;

    constructor(studentName, mobile, semester, email, dateOfBirth, branch, addressLine, city, state, pincode) {
        this.studentName = studentName;
        this.mobile = mobile
        this.semester = semester;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.branch = branch;
        this.addressLine = addressLine;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.result=null;
    }
}
export default Student;