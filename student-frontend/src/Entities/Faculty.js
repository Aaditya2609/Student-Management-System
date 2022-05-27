class Faculty {
    facultyId;
    facultyName;
    userName;
    password;
    enrolledStudents;
    course;

    constructor(facultyName, userName, password, course) {
        this.facultyName = facultyName;
        this.userName = userName
        this.password = password;
        this.enrolledStudents = null;
        this.course = course;
    }
}
export default Faculty;