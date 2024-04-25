CREATE TABLE `School` (
 `school_id` integer PRIMARY KEY,
 `schooltype` varchar(255) NOT NULL,
 `location` varchar(255) NOT NULL
);

CREATE TABLE `Subject` (
 `subjectId` integer PRIMARY KEY,
 `subjectName` varchar(255) NOT NULL
);

CREATE TABLE `Classroom` (
 `classroomId` integer PRIMARY KEY,
 `facilityType` varchar(255) NOT NULL,
 `location` varchar(255) NOT NULL
);

CREATE TABLE `Student` (
 `studentId` integer PRIMARY KEY,
 `name` varchar(255) NOT NULL,
 `dateOfBirth` date NOT NULL,
 `schoolId` integer NOT NULL,
 FOREIGN KEY (`schoolId`) REFERENCES `School` (`school_id`)
);

CREATE TABLE `Parent` (
 `guardianId` integer PRIMARY KEY,
 `name` varchar(255) NOT NULL,
 `contactInfo` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `address` varchar(255) NOT NULL
);

CREATE TABLE `Student_Parent` (
 `studentId` integer NOT NULL,
 `parentId` integer NOT NULL,
 PRIMARY KEY (`studentId`, `parentId`),
 FOREIGN KEY (`studentId`) REFERENCES `Student` (`studentId`),
 FOREIGN KEY (`parentId`) REFERENCES `Parent` (`guardianId`)
);

CREATE TABLE `Class` (
 `classId` integer PRIMARY KEY,
 `subjectId` integer NOT NULL,
 `classroomId` integer NOT NULL,
 `TeacherName` varchar(255) NOT NULL,
 `Term` varchar(255) NOT NULL,
 `Year` integer NOT NULL,
 FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`subjectId`),
 FOREIGN KEY (`classroomId`) REFERENCES `Classroom` (`classroomId`)
);

CREATE TABLE `Attendance` (
 `attendanceId` integer PRIMARY KEY,
 `studentId` integer NOT NULL,
 `ClassId` integer NOT NULL,
 `Date` date NOT NULL,
 `TimeArrive` time NOT NULL,
 `TimeLeave` time NOT NULL,
 FOREIGN KEY (`studentId`) REFERENCES `Student` (`studentId`),
 FOREIGN KEY (`ClassId`) REFERENCES `Class` (`classId`)
);

CREATE TABLE `Marks` (
 `MarkId` integer PRIMARY KEY,
 `studentId` integer NOT NULL,
 `subjectId` integer NOT NULL,
 `Mark` decimal NOT NULL,
 FOREIGN KEY (`studentId`) REFERENCES `Student` (`studentId`),
 FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`subjectId`)
);

CREATE TABLE `Term` (
 `TermId` integer PRIMARY KEY,
 `schoolId` integer NOT NULL,
 `TermName` varchar(255) NOT NULL,
 `startDate` date NOT NULL,
 `endDate` date NOT NULL,
 FOREIGN KEY (`schoolId`) REFERENCES `School` (`school_id`)
);

CREATE TABLE `Enrollment` (
 `EnrollmentId` integer PRIMARY KEY,
 `studentId` integer NOT NULL,
 `courseId` integer NOT NULL,
 `enrollmentDate` date NOT NULL,
 `cancellation` date,
 FOREIGN KEY (`studentId`) REFERENCES `Student` (`studentId`),
 FOREIGN KEY (`courseId`) REFERENCES `Course` (`courseId`)
);

CREATE TABLE `Course` (
 `courseId` integer PRIMARY KEY,
 `courseName` varchar(255) NOT NULL,
 `subjectId` integer NOT NULL,
 `Level` varchar(255) NOT NULL,
 FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`subjectId`)
);

CREATE TABLE `Teachers` (
 `teacherId` integer PRIMARY KEY,
 `name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `phone` varchar(255) NOT NULL
);

CREATE TABLE `TeacherPerCourse` (
 `TeacherId` integer NOT NULL,
 `courseId` integer NOT NULL,
 `TermId` integer NOT NULL,
 PRIMARY KEY (`TeacherId`, `courseId`, `TermId`),
 FOREIGN KEY (`TeacherId`) REFERENCES `Teachers` (`teacherId`),
 FOREIGN KEY (`courseId`) REFERENCES `Course` (`courseId`),
 FOREIGN KEY (`TermId`) REFERENCES `Term` (`TermId`)
);
